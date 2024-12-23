DROP TABLE IF EXISTS public.follow;

CREATE TABLE public.follow (
  id UUID DEFAULT uuid_generate_v4(),
  following_user UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  followed_user UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT current_timestamp,
  PRIMARY KEY (id),
  UNIQUE (following_user, followed_user),
  CONSTRAINT different_users CHECK (following_user <> followed_user)
);
ALTER TABLE public.follow ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public followers are viewable by everyone." ON public.follow FOR SELECT
  USING (true);

CREATE POLICY "Users can follow other users" ON public.follow FOR INSERT TO authenticated
  with check (true);

create policy "Users can unfollow a user they follow."
on public.follow for delete
to authenticated                     -- the Postgres Role (recommended)
using ( (select auth.uid()) = following_user );  


-- Triggers to decrement followers
CREATE OR REPLACE FUNCTION decrement_follower()
RETURNS TRIGGER 
SECURITY DEFINER
AS $$
BEGIN

  -- Decrease the follower count for the user who is being unfollowed
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
      raw_user_meta_data,
      '{followers}',
      to_jsonb((raw_user_meta_data->>'followers')::int - 1)
  )
  WHERE id = OLD.followed_user;

  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
      raw_user_meta_data,
      '{following}',
      to_jsonb((raw_user_meta_data->>'following')::int - 1)
  )
  WHERE id = OLD.following_user;

  RETURN OLD;  -- Return OLD for DELETE triggers
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create the trigger
CREATE OR REPLACE TRIGGER decrement_followers
AFTER DELETE ON public.follow -- AFTER DELETE to process removed rows
FOR EACH ROW
EXECUTE FUNCTION decrement_follower();


-- trigger to increment followers
CREATE OR REPLACE FUNCTION increment_follower()
RETURNS TRIGGER 
security definer
AS $$
BEGIN
  -- Update the user metadata in the auth table
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
      raw_user_meta_data,
      '{followers}',
      to_jsonb((raw_user_meta_data->>'followers')::int + 1)
  )
  WHERE id = NEW.followed_user;

  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    raw_user_meta_data,
    '{following}',
    to_jsonb((raw_user_meta_data->>'following')::int + 1)
  )
  WHERE id = NEW.following_user;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create the trigger
CREATE OR REPLACE TRIGGER increment_followers
AFTER insert on public.follow
FOR EACH ROW
EXECUTE FUNCTION increment_follower();