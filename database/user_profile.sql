

-- Always verify the output before executing
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create a table for public profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  created_at TIMESTAMP WITHOUT TIME ZONE,
  updated_at TIMESTAMP WITHOUT TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  bio TEXT,
  location TEXT,
  dob TEXT,
  private BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  followers INTEGER DEFAULT 0,
  following INTEGER DEFAULT 0,
  CONSTRAINT username_length CHECK (CHAR_LENGTH(username) >= 3),
  fts TSVECTOR GENERATED ALWAYS AS (TO_TSVECTOR('english', username || ' ' || full_name || ' ' || bio)) STORED
);

CREATE INDEX profiles_fts ON public.profiles USING GIN (fts); -- Generate the index

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT
  WITH CHECK (id = auth.uid());

CREATE POLICY "Can only update own profile data." ON public.profiles
  FOR UPDATE TO authenticated USING (
    (SELECT auth.uid()) = id
  )
  WITH CHECK (
    (SELECT auth.uid()) = id
  );

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
CREATE or replace FUNCTION public.handle_new_user() RETURNS TRIGGER
  SET SEARCH_PATH = '' AS $$
BEGIN
  INSERT INTO public.profiles (
    id, created_at, full_name, avatar_url, bio, followers, following, private, verified, username, website, location, dob
  ) VALUES (
    NEW.id, 
    NEW.created_at,
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'bio',
    COALESCE((NEW.raw_user_meta_data->>'followers')::INTEGER, 0), -- Default to 0 if missing
    COALESCE((NEW.raw_user_meta_data->>'following')::INTEGER, 0), -- Default to 0 if missing
    COALESCE((NEW.raw_user_meta_data->>'private')::BOOLEAN, FALSE), -- Default to FALSE if missing
    COALESCE((NEW.raw_user_meta_data->>'verified')::BOOLEAN, FALSE), -- Default to FALSE if missing
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'website',
    NEW.raw_user_meta_data->>'location',
    NEW.raw_user_meta_data->>'dob'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on_auth_user_created after insert on auth.users for each row
-- Execute procedure public.handle_new_user();
CREATE or replace TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- This trigger automatically updates a profile entry when a user updates user meta data.
CREATE or replace FUNCTION public.handle_update_user() RETURNS TRIGGER
  SET SEARCH_PATH = '' AS $$
BEGIN
  UPDATE public.profiles
  SET
    full_name = NEW.raw_user_meta_data->>'full_name',
    avatar_url = NEW.raw_user_meta_data->>'avatar_url',
    bio = NEW.raw_user_meta_data->>'bio',
    followers = (NEW.raw_user_meta_data->>'followers')::INTEGER,
    following = (NEW.raw_user_meta_data->>'following')::INTEGER,
    private = (NEW.raw_user_meta_data->>'private')::BOOLEAN,
    verified = (NEW.raw_user_meta_data->>'verified')::BOOLEAN,
    username = NEW.raw_user_meta_data->>'username',
    website = NEW.raw_user_meta_data->>'website',
    location = NEW.raw_user_meta_data->>'location',
    dob = NEW.raw_user_meta_data->>'dob'
    WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger handle_update_user after update on auth.users for each row
-- Execute procedure public.handle_update_user();
create or replace trigger on_auth_user_updated
  AFTER update on auth.users
  for each row
  execute procedure public.handle_update_user();

-- Delete objects in the 'avatars' bucket to maintain referential integrity
DELETE FROM storage.objects
WHERE bucket_id = 'avatars';

-- Delete the avatars bucket if it exists
DELETE FROM storage.buckets
WHERE name = 'avatars';

-- Create a new avatars bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', TRUE);

DROP POLICY IF EXISTS "Avatar images are publicly accessible." ON storage.objects;

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
CREATE POLICY "Avatar images are publicly accessible." ON storage.objects 
  FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Authenticated users can upload an avatar." ON storage.objects;

CREATE POLICY "Authenticated users can upload an avatar." ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars');
