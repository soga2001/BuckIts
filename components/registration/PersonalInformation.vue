<script lang="ts">

export default defineComponent( {
    props: {
        fullnameProp: {
            type: String,
            required: false,
            default: ""
        },
        usernameProp: {
            type: String,
            required: false,
            default: ""
        },
        phoneProp: {
            type: String,
            required: false,
            default: ""
        },
        monthProp: {
            type: String,
            required: false,
            default: ""
        },
        dayProp: {
            type: [String, Number],
            required: false,
            default: ""
        },
        yearProp: {
            type: [String, Number],
            required: false,
            default: ""
        },
        bioProp: {
            type: String,
            required: false,
            default: ""
        }

    },
    data() {
        return {
            fullname: this.fullnameProp,
            username: this.usernameProp,
            phone: this.phoneProp,
            month: this.monthProp,
            day: this.dayProp,
            year: this.yearProp,
            bio: this.bioProp,
            dob: '',

            
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
        }
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
                this.$emit('update:dob', this.dob)
            }
        }
    },
    watch: {
        fullname() {
            this.$emit('update:fullname', this.fullname)
        },
        username() {
            this.$emit('update:username', this.username)
        },
        phone() {
            this.$emit('update:phone', this.phone)
        },
        day() {
            this.$emit('update:day', this.day)
            this.updateDOB();
        },
        year() {
            if(this.month && this.year) {

                const parsedYear = typeof this.year === 'string' ? parseInt(this.year) : this.year;

                const tempDay = new Date(parsedYear, parseInt(this.monthMap[this.month]), 0).getDate() || 31;

                if((this.currentMonth < parseInt(this.monthMap[this.month])) && (this.currentYear == parsedYear)) {
                this.month = '';
                }

                

                this.dayList = Array<number>(tempDay).fill(0).map((_, i) => i + 1);

                const parsedDay = typeof this.day === 'string' ? parseInt(this.day) : this.day;

                if(parsedDay > tempDay) {
                    this.day = '';
                }
            }

            this.$emit('update:year', this.year)
            this.updateDOB();

        },
        month() {
            this.daysInAMonth();

            this.$emit('update:month', this.month)

            this.updateDOB();

        },
        bio() {
            this.$emit('update:bio', this.bio)
        }
    },
    computed: {
        computedYear() {
            return typeof this.year === 'string' ? parseInt(this.year) : this.year;
        },
        computedDay() {
            return typeof this.day === 'string' ? parseInt(this.day) : this.day;
        }
    }
})

</script>

<template>
    <div class="flex flex-col gap-1 mx-auto w-full" style=" max-width: 600px">
        <form class="form flex flex-col gap-3" ref="loginForm" @submit.prevent="">
            <div class="text-center text-2xl font-bold">
                Personal Information
            </div>
            <div class="flex flex-col gap-1">

            
                <div class="flex-column">
                <label>Full Name </label>
                </div>

                <InputGroup class="input-group">
                    <InputGroupAddon class="input-addon">
                        <i class="material-icons">person</i>
                    </InputGroupAddon>
                    <InputText class="input" type="text" v-model="fullname" placeholder="Enter your full name" />
                </InputGroup>
            </div>

            <div class="flex flex-col gap-1">
                
                <div class="flex-column">
                <label>Username </label>
                </div>

                <InputGroup class="input-group">
                    <InputGroupAddon class="input-addon">
                        <i class="material-icons">alternate_email</i>
                    </InputGroupAddon>
                    <InputText class="input" type="text" v-model="username" placeholder="Enter a username" />
                </InputGroup>

            </div>
                

            <div class="flex flex-col gap-1">

                <div class="flex-column">
                <label>Phone Number </label>
                </div>

                

                <InputGroup class="input-group">
                    <InputGroupAddon class="input-addon">
                        <i class="material-icons">phone</i>
                    </InputGroupAddon>
                    <InputMask  variant="outlined" class="input" v-model="phone" mask="(999) 999-9999" placeholder="Enter Phone Number" />
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
                    <Select v-model="month" :options="monthsList" checkmark size="small" placeholder="Month" class="w-full">
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
                    <Select v-model="day" :options="dayList" checkmark size="small" placeholder="Day" class="w-full">
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
                    <Select  v-model="year" :options="yearList" checkmark size="small" placeholder="Year" class="w-full dob-select">
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
            
            <div class="flex flex-col gap-1">

                <div class="flex-column">
                <label>Bio <span class="italic text-sm">(Optional)</span></label>
                </div>
                <Textarea  v-model="bio" rows="5" fluid />
            </div>

        </form>
    </div>
</template>

<style lang="scss" scoped>

select {

width: 100%;
cursor: pointer;
appearance: none;

background-color: black;
// color: white;
font-size: 1rem !important;

padding: 10px 10px;
border-radius: 5px;
border: 1px solid rgb(var(--ion-color-light-rgb), 0.5);
font-size: 1rem;
outline: none;



&:hover {
  border: 1px solid rgb(var(--ion-color-light-rgb), 0.3);

}

&:focus {
  border: 1px solid var(--ion-color-primary);
}

&:active {
  outline: none;
}



:disabled {
  background-color: #222428;
  color: #8e8e8e;
}


&::-webkit-scrollbar {
  width: 5px;
}

/* Track */
&::-webkit-scrollbar-track {
  background: #222428;
}

/* Handle */
&::-webkit-scrollbar-thumb {
  background: var(--ion-color-primary);
  border-radius: 10px;
}

/* Handle on hover */
// &::-webkit-scrollbar-thumb:hover {
//   background: rgba(var(--ion-color-primary-rgb), 0.5);
// }

}


select:focus > option:checked :enabled {
background: rgba(var(--ion-color-primary-rgb, .3)) !important;
}


textarea {

resize: none;
}

.active {
color: var(--ion-color-primary);
background-color: transparent;
}

.option {
background-color: #222428;

}


ion-icon {
    font-size: 1.5rem;
}
</style>