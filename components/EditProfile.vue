<template>
    <div class="card flex justify-center">
        <Button variant="outlined"  @click="visible=true" label="Edit Profile" icon="pi pi-user-edit" />
        <Dialog v-model:visible="visible"  modal header="Edit Profile" pt:root:class="!border-0" pt:mask:class="backdrop-blur-sm" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-1">
                    <div class="flex-column">
                        <label>Full Name </label>
                    </div>

                    <InputGroup class="input-group">
                        <InputGroupAddon class="input-addon">
                            <i class="material-icons">person</i>
                        </InputGroupAddon>
                        <InputText class="input" type="text" v-model="fullname" placeholder="Enter full name" />
                    </InputGroup>
                </div>

                <div class="flex flex-col gap-1">            
                    <div class="flex-column">
                        <label>Email </label>
                    </div>

                    <InputGroup class="input-group">
                        <InputGroupAddon class="input-addon">
                            <i class="material-icons">mail</i>
                        </InputGroupAddon>
                        <InputText class="input" type="text" v-model="email" placeholder="Enter email" />
                    </InputGroup>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="flex-column">
                        <label>Date Of Birth</label>
                    </div>

                    <div class="grid grid-cols-3 gap-2">
                    <div class="flex flex-col gap-2">
                        <span class="text-sm">Month</span>
                        <div class="custom-select">
                        <Select v-model="month" :options="monthsList" checkmark placeholder="Month" class="w-full">
                            <template #optiongroup="slotProps">
                                <div class="flex items-center">
                                    {{ slotProps }}
                                </div>
                            </template>
                        </Select>
                        </div>

                    </div>

                    <div class="flex flex-col gap-2">
                        <span class="text-sm">Day</span>
                        <div class="custom-select">
                        <Select :default-value="computedDay" v-model="day" :options="dayList" checkmark placeholder="Day" class="w-full">
                            <template #optiongroup="slotProps">
                                <div class="flex items-center">
                                    {{ slotProps }}
                                </div>
                            </template>
                        </Select>

                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <span class="text-sm">Year</span>
                        <div class="custom-select">
                        <Select :default-value="computedYear" v-model="year" :options="yearList" checkmark placeholder="Year" class="w-full dob-select">
                            <template #optiongroup="slotProps">
                                <div class="flex items-center">
                                    {{ slotProps }}
                                </div>
                            </template>
                        </Select>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </Dialog>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            visible: false,
            fullname: '',
            email: '',
            month: '',
            day: '',
            year: '',
            dob: '',
            bio: '',

            dayList: Array.from({length: 31}, (_, i) => i + 1),
            yearList: Array.from({length: 100}, (_, i) => new Date().getFullYear() - i),
            currentMonth: new Date().getMonth() + 1,
            currentYear: new Date().getFullYear(),
            todayDate: new Date().getDate(),
            monthsList: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

            monthMap: {
                "January":  '01',
                "February": '02',
                "March":    '03',
                "April":    '04',
                "May":      '05',
                "June":     '06',
                "July":     '07',
                "August":   '08',
                "September":'09',
                "October":  '10',
                "November": '11',
                "December": '12',
            } as {[key: string]: string}
        };
    },
    setup() {
        return {
            store: useStore()
        }
    },
    created() {
        const tempDate = new Date(this.store.getUser.user_metadata?.dob as string);
        this.fullname = this.store.getUser.user_metadata?.full_name as string;
        this.email = this.store.getUser.email as string;
        this.month = this.monthsList[tempDate.getMonth() - 1];
        this.day = (tempDate.getDate()).toString();
        this.year = (tempDate.getFullYear()).toString();
    },
    methods: {
        daysInAMonth() {
            const monthTemp = parseInt(this.monthMap[this.month]);
            const daysInMonthMap = {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31,
            } as {[key: number]: number};

            this.dayList = Array<number>(daysInMonthMap[monthTemp]).fill(0).map((_, i) => i + 1);
        },
        updateDOB() {
            if(this.year != '' && this.day != '' && this.month != '') {
                const tempYear = typeof this.year === 'string' ? parseInt(this.year) : this.year;
                const tempDay = typeof this.day === 'string' ? parseInt(this.day) : this.day;
                this.dob = new Date(tempYear, parseInt(this.monthMap[this.month]), tempDay).toISOString();
            }
        }
    },
    watch: {
        day() {
            this.updateDOB();
        },
        year() {
            if(this.month && this.year) {

                const tempDay = new Date(this.computedYear, parseInt(this.monthMap[this.month]), 0).getDate() || 31;

                if((this.currentMonth < parseInt(this.monthMap[this.month])) && (this.currentYear == this.computedYear)) {
                this.month = '';
                }

                

                this.dayList = Array<number>(tempDay).fill(0).map((_, i) => i + 1);
                
                if(this.computedDay > tempDay) {
                    this.day = '';
                }
            }

            this.updateDOB();

        },
        month() {
            this.daysInAMonth();
            this.updateDOB();
        },
    },
    computed: {
        computedYear() {
            return typeof this.year === 'string' ? parseInt(this.year) : this.year;
        },
        computedDay() {
            return typeof this.day === 'string' ? parseInt(this.day) : this.day;
        }
    }
    
});
</script>
