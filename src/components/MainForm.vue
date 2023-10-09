<template>
    <section class="form-section">
        <div class="form-section__content">
            <form class="form" v-on:submit.prevent="handleSubmit">
                <h3 class="form__title">Добавить данные</h3>
                <a class="form__link" href="https://t.me/faceeId_bot">Telegram bot</a>

                <input v-model="idworker" type="text" class="form__input" name="input-idworker" id="input-idworker" placeholder="id номер*">
                <input v-model="name" type="text" class="form__input" name="input-name" id="input-name" placeholder="Имя*">
                <input v-model="lastname" type="text" class="form__input" name="input-lastname" id="input-lastname" placeholder="Фамилия*">
                <input v-model="phone" type="text" class="form__input" name="input-phone" id="input-phone" placeholder="Телефон +77778889966*">
                <input v-model="tg" type="text" class="form__input" name="input-telegram" id="input-telegram" placeholder="@Telegram*">
            
                <button :class="isValid ? 'form__button' : 'form__button form__button_dis'">Отправить</button>

                <span class="form__ok">{{ isOk ? ('Добавлен в систему ' + lastAddingPerson) : ''}}</span>
            </form>
        </div>
    </section>
</template>

<script>
import {mapActions} from 'vuex';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    name: 'MainForm',
    props: {
        setPreloaderUnActive: Function,
        setPreloaderActive: Function
    },
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            idworker: '',
            name: '',
            lastname: '',
            tg: '',
            phone: '',
            isOk: false,
            lastAddingPerson: ''
        }
    },
    validations() {
        return {
            idworker: { required },
            name: { required },
            lastname: { required },
            tg: { required },
            phone: { required },
        }
    },
    methods: {
        ...mapActions([
            'POST_CLIENT'
        ]),
        handleSubmit() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return 0;
            }

            var res = {
                workid: this.idworker,
                name: this.name,
                surname: this.lastname,
                phoneNumber: this.phoneFilter,
                telegram: this.tgFilter
            }
            this.setPreloaderActive();

            this.POST_CLIENT(res)
                .then((ind) => {
                    console.log('OK')
                    this.isOk = true
                    this.setPreloaderUnActive();
                    this.lastAddingPerson = this.name + ' ' + this.lastname;
                    this.setDefautData();


                    // this.$router.push( {name: 'confirm', query: { 'orderID': ind }});
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        setDefautData() {
            this.name = '';
            this.idworker = '';
            this.lastname = '';
            this.tg = '';
            this.phone = '';
        }
    },
    computed: {
        isValid() {
            // console.log(this.v$.$invalid);

            if(this.v$.$invalid) {
                return false;
            }

            return true;

        },
        tgFilter() {
            if(this.tg.length != 0 && this.tg[0] == '@') {
                return this.tg.substring(1)
            }

            return this.tg
        },
        phoneFilter() {
            if(this.phone.length != 0 && this.phone[0] == '+') {
                return this.phone.substring(1)
            }

            return this.phone
        }
    }
}
</script>

<style>

.form-section {
    width: 100%;
    height: 100vh;

    background: #EEF4FF;
    box-shadow: 0px 2.85954px 3.05905px 0px rgba(0, 83, 174, 0.04), 0px 9.60461px 10.2747px 0px rgba(0, 83, 174, 0.07), 0px 43px 46px 0px rgba(0, 83, 174, 0.11);

    display: flex;
    align-items: center;
    justify-content: center;
}

.form-section__title {
    width: 438px;
    color: #2F3EC6;
    font-family: Inter;
    font-size: 48px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%; 
}



.form__ok {
    color: #2F3EC6;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%; 
    margin-top: 15px;
}

.form-section__content {
    width: 80%;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 80px;
}

.form {
    width: 566px;
    box-sizing: border-box;
    display: flex;
    padding: 40px 60px 60px 60px;
    flex-direction: column;
    align-items: center;

    border-radius: 24px;
    background: #FFF;
    box-shadow: 4px 6px 20px 0px rgba(81, 59, 214, 0.06), 12px 26px 40px 0px rgba(81, 59, 214, 0.04);
}

.form__title {
    color: #13131A;
    text-align: center;
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 32px */

    margin: 0;

    margin-bottom: 10px;
}


.form__link {
    color: #8f92b6;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%;

    margin: 0;
    margin-bottom: 20px;
}

.form__input {
    outline: none;
    width: 100%;
    padding: 16px 24px;

    box-sizing: border-box;

    border-radius: 8px;
    border: 0.5px solid rgba(81, 59, 214, 0.60);
    background: #FFF;

    color: rgba(19, 19, 26, 0.70);
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;

    margin-bottom: 16px;

}

.form__button {
    display: flex;
    width: 100%;
    padding: 16px 24px;
    align-items: center;

    border-radius: 8px;
    background: #2F3EC6;

    border: none;

    color: #FFF;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;

    cursor: pointer;
}

.form__button_dis {
    background: #9d9d9d;
    cursor: default;
}

@media screen and (max-width: 1100px) {
    .form-section__content {
        flex-direction: column-reverse;
        gap: 40px;
        justify-content: center;
        align-items: center;

    }

    .form-section__title {
        margin: 0;
    }
}

@media screen and (max-width: 700px) {
    .form-section__title {
        width: 100%;
        text-align: center;
        font-size: 38px;
    }

    .form-section__content {
        gap: 30px;
    }

    .form {
        width: 100%;
        padding: 20px 30px 30px 30px;

    }

    .form__logo {
        margin-bottom: 24px;
    }

    .form__title {
        font-size: 26px;
    }

    .form__input {
        padding: 12px 20px;
        font-size: 16px;
    }

    .form__button {
        padding: 12px 20px;
        font-size: 16px;
    }
}

</style>