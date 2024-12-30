<script setup lang="ts">
import type { Sessions } from '~/assets/interface/sessions';

definePageMeta({
    name: 'Sessions',
    keepalive: false,
    auth: true,
})

const sessions = ref<Sessions[] | null>(null);
const currentSessionId = ref<string>('');
const loadingAllSessions = ref(false);
const loadingCurrentSession = ref(false);

const confirm = useConfirm();
const toast = useToast();

const requireConfirmation = () => {
    confirm.require({
        group: 'headless',
        header: 'Do you want to end your other sessions?',
        message: 'You’re about to end your other active X sessions, and you’ll need to log in again on those devices to start a new ones.',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const getSessions = async () => {
    loadingAllSessions.value = true;
    const {data, error } = await useFetch('/api/sessions/getAll');
    if (data != null) {
        const {data: session} = data.value as { data: Sessions[], message: string, status: number };
        console.log(session);
        sessions.value = session;
    }
}

const getCurrentSessions = async () => {
    loadingCurrentSession.value = true;
    const {data, error } = await useFetch('/api/sessions/getCurrent');
    if (data != null) {
        const {sessionId} = data.value as { sessionId: string};
        currentSessionId.value = sessionId;
    }
}

onMounted(() => {
    loadingCurrentSession.value = false;
    loadingAllSessions.value = false;
    // console.log(sessions.value);
    console.log(currentSessionId.value);
});

getSessions();
getCurrentSessions();

const device = ref<string>('');
const lastActive = ref<string>('');

const logoutOfAllSessions = () => {
    
}

const getDeviceType = () => {

}

const getDevice = (userAgent: string) => {
    let os = 'Unknown';

        // Detect operating system
    if (/windows nt/.test(userAgent)) {
        os = 'Windows';
    } else if (/macintosh|mac os x/.test(userAgent)) {
        os = 'Mac';
    } else if (/android/.test(userAgent)) {
        os = 'Android';
    } else if (/linux/.test(userAgent)) {
        os = 'Linux';
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
        os = 'iOS';
    }

    return os;
}

function getDeviceInfo() {
  const userAgent = navigator.userAgent.toLowerCase();

  let deviceType = 'Desktop';
  let os = 'Unknown OS';

  // Detect device type
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent)) {
    deviceType = 'Mobile';
  } else if (/tablet|ipad/.test(userAgent)) {
    deviceType = 'Tablet';
  }
  else {
    deviceType = 'Desktop';
  }

}


</script>

<template>
    <div class="w-full flex flex-col gap-4">
        <div class="px-4 pt-2">
            <h3 class="font-medium text-2xl">Sessions</h3>
            <p class="text-tertiary text-sm">Sessions are the devices you are using or that have used your X account. These are the sessions where your account is currently logged in. You can log out of each session.</p>
        </div>
        <div class="px-4">
            <h4 class="font-medium text-lg">Current Active Sessions</h4>
            <p class="text-tertiary text-sm">You’re logged into this BuckIT account on this device and are currently using it.
            </p>
        </div>
        <ClientOnly fallback-tag="span">
            <div v-if="sessions != null && currentSessionId !=  ''" v-for="session in sessions" :key="session.id">
                <items v-if="session.id == currentSessionId">
                    <template #icon-left>
                        <i class="material-icons">phone_android</i>
                    </template>
                    <template #title>
                        {{getDevice(session.user_agent)}}
                    </template>
                    <template #description>
                        Last active: 2 hours ago
                    </template>
                    <template #icon-right>
                        <i class="material-icons">chevron_right</i>
                    </template>
                </items>
            </div>
            <template #fallback>
                <items>
                    <template #icon-left>
                        <Skeleton width="40px" height="40px" class="rounded-full" />
                    </template>
                    <template #title>
                        <Skeleton width="100px" height="20px" />
                    </template>
                    <template #description>
                        <Skeleton width="125px" height="15px" />
                    </template>
                    <template #icon-right>
                        <i class="material-icons">chevron_right</i>
                    </template>
                </items>
            </template>
        </ClientOnly>
       
        <hr class="border-b border-surface-0 dark:border-surface-700"  />
        <div class="px-4">
            <h4 class="font-medium text-lg">Log out of other sessions</h4>
            <p class="text-tertiary text-sm">
                You’re logged into these accounts on these devices and aren’t currently using them. 
            </p>
            <p class="text-tertiary text-sm mt-4">
                Logging out will end 
                <span v-if="sessions && !loadingAllSessions">{{ sessions?.length - 1 }}</span> 
                <span v-else-if="loadingAllSessions">...</span>
                of your other active X sessions. It won’t affect your current active session.
            </p>
        </div>
        <Button variant="text" severity="danger" label="Log out of all sessions"></Button>
        <ConfirmDialog group="headless" class="max-w-[400px]">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
                    <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                        <i class="pi pi-question text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
                    <p class="mb-0 text-secondary">{{ message.message }}</p>
                    <div class="flex justify-between gap-2 mt-6">
                        <Button label="Cancel" outlined @click="rejectCallback" class="w-32 btn-secondary"></Button>
                        <Button label="Save" outlined @click="acceptCallback" class="w-32"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>
        <div>
            <ClientOnly fallback-tag="span">
                <div v-if="sessions != null" v-for="session in sessions" :key="session.id">
                    <Items v-if="session.id != currentSessionId">
                        <template #icon-left>
                            <i class="material-icons">phone_android</i>
                        </template>
                        <template #title>
                            {{getDevice(session.user_agent)}}
                        </template>
                        <template #description>
                            Last active: 2 hours ago
                        </template>
                        <template #icon-right>
                            <i class="material-icons">chevron_right</i>
                        </template>
                    </Items>
                </div>
                <template #fallback>
                    <items >
                        <template #icon-left>
                            <Skeleton width="40px" height="40px" class="rounded-full" />
                        </template>
                        <template #title>
                            <Skeleton width="100px" height="20px" />
                        </template>
                        <template #description>
                            <Skeleton width="125px" height="15px" />
                        </template>
                        <template #icon-right>
                            <i class="material-icons">chevron_right</i>
                        </template>
                    </items>
                </template>
            </ClientOnly>
        </div>
    </div>


</template> 