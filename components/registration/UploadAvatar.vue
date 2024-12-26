<script lang="ts">

import { usePrimeVue } from 'primevue/config';
import type { FileUploadSelectEvent, FileUploadRemoveEvent } from 'primevue/fileupload';
import type { User } from '~/assets/interface/user';
import { useStore } from '~/stores/stores';

export default defineComponent({
    data() {
        return {
            file: null as File | null,
            imgURL: '',
            url: "",
            disabled: false,
            loading: false,
        }
    },
    setup() {
        const store = useStore()
        const supabase = useSupabaseClient()
        const primevue = usePrimeVue();
        const tempUser = useSupabaseUser()
        const user = (tempUser.value as unknown) as User
        return {store, supabase, primevue, user}
    },
    methods: {
        async getPublicURL() {
            const { data } = await this.supabase.storage.from('avatars').getPublicUrl(`${this.user.id}/avatar`);
            this.url = data.publicUrl
            this.updateProfile()
        },
        async uploadAvatar() {
            if(this.file == null) {
                return null;
            }
            this.loading = true
            const formData = new FormData();
            formData.append('file', this.file as Blob);

            const {url, error} = await $fetch<{
                url: string,
                error: never
            }>('/api/uploadAvatar', {
                method: 'POST',
                body: formData
            })
            if (error) {
               this.loading = false
            }

            if (url) {
                this.url = url
                this.updateProfile()
            }
        },
        async updateProfile() {
            const userProfile = {
                avatar_url: this.url as string
            }

            const {user, error} = await $fetch('/api/profile/update', {
                method: 'POST',
                contentType: 'application/json',
                body: userProfile
            })


            if(!error) {
                this.store.setUser(user as User)
            }
            this.loading = false
        },
        fileChange(e: FileUploadSelectEvent) {
            this.file = e.files[0] as File;
            this.imgURL = URL.createObjectURL(this.file);
        },
        removeFile(e: FileUploadRemoveEvent) {
            this.file = null;
            this.imgURL = '';
        },
        formatSize(bytes: any) {
            const k = 1024;
            const dm = 3;
            let sizes = this.primevue.config?.locale?.fileSizeTypes;

            if (bytes === 0 && sizes?.length) {
                return `0 ${sizes[0]}`;
            }

            const i = Math.floor(Math.log(bytes) / Math.log(k));
            const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

            return `${formattedSize} ${sizes?.length && sizes[i]}`;
        }
    },
    watch: {
        file() {
            this.disabled = ((this.file !== null) || this.file !== undefined) ? false : true;
        },
    }
})
</script>

<template>
    <div>
        <div class="text-center mb-4 text-2xl font-bold">Upload an avatar <span class="italic text-sm">(Optional)</span></div>
        <FileUpload class="w-full" name="demo[]" v-model="file" :showCancelButton="false" :showUploadButton="false" @select="fileChange" @removeUploadedFile="removeFile" :auto="true" accept="image/*" :maxFileSize="1000000">
            <template #header="{ chooseCallback }">
            <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                <div class="flex gap-2">
                    <Button rounded :disabled="disabled" @click="chooseCallback()" class="avatar-upload !p-2 !bg-transparent btn-secondary">
                        <i class="material-icons">upload</i>
                    </Button>
                </div>
            </div>
            </template>  
            <template #content="{ removeUploadedFileCallback}">
                <div class="flex flex-col items-center gap-8 pt-4">
                
                <div v-if="file != null">
                    <div class="flex flex-wrap gap-4">
                    <div :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                        <div>
                        <img
                            role="presentation"
                            :alt="file.name"
                            :src="imgURL"
                            width="100%"
                            maxWidth="200"
                            rows="3"
                        />
                        </div>
                        <span
                        class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                        >{{ file.name }}</span
                        >
                        <div>{{ formatSize(file.size) }}</div>

                        <!-- <button  class="delete_button material-icons text-red-500" @click="removeUploadedFileCallback(0)">delete</button> -->
                        <Button rounded :disabled="disabled" @click="removeUploadedFileCallback(0)" severity="danger" class="!p-2">
                            <i class="material-icons">delete</i>
                        </Button>
                    </div>
                    </div>
                </div>
                </div>
            </template>
            <template v-if="file == null" #empty>
                <div class="flex items-center justify-center flex-col w-full p-10"  >
                     <i class="material-icons upload-icon border rounded-full p-5" style="font-size: 4rem">cloud_upload</i>
                    <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                </div>
            </template>
        </FileUpload>

        <div class="flex justify-center mt-5 self-stretch">
            <Button variant="outlined" type="button" label="Upload Avatar" :loading="loading" @click="uploadAvatar" />
        </div>
    </div>
</template>


<style scoped lang="scss">


img {
    max-width: 100%;
    max-height: 150px;
    object-fit: cover;

}

ion-icon {
    font-size: 1.5rem;

    &.upload-icon {
        font-size: 3rem;
        color: var(--ion-color-primary);
        border: 2px dashed var(--ion-color-primary);
        border-radius: 50%;
        padding: 30px;
    }
}

ion-button {

    &.avatar-upload {
        color: var(--ion-color-primary);
        --background: transparent;
        border: 1px solid var(--ion-color-primary);
        border-radius: 50%;
        transition: all .1s ease-in-out;

        &:hover {
      // color: white;;
        --background: rgba(var(--ion-color-primary-shade-rgb), .4);
        border: 1px solid white;
        }
    }

    &.delete_button {
        
    --background: transparent !important;
    color: red;
    border: 1px solid red;
    border-radius: 50%;

        &:hover {
        color: rgba(var(--ion-color-danger-contrast-rgb));
        --background: red !important;
        }

    }

}

ion-icon {
    font-size: 1.5rem;
}

</style>