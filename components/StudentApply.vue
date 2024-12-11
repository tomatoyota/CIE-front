<template>
  <div class="overlay">
    <div class="card">
      <div class="cardHeader">
        <div class="d-flex justify-end">
          <Icon
            @click="closeDialog"
            name="mdi:close"
            class="outlinkIcon text-2xl"
          />
        </div>
      </div>
      <div class="cardBody">
        <div class="text-style mb-4">基本資料</div>
        <div class="grid grid-cols-1 gap-4">
          <div class="grid grid-cols-2 gap-4">
            <!-- 中文姓名 -->
            <div>
              <label class="mb-2 block font-bold"
                ><label class="mb-2 font-bold text-red-500">*</label
                >中文姓名</label
              >
              <input
                v-model="formData.chineseName"
                type="text"
                placeholder="請輸入中文姓名"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <!-- 英文姓名 -->
            <div>
              <label class="mb-2 block font-bold">英文姓名</label>
              <input
                v-model="formData.englishName"
                type="text"
                placeholder="請輸入英文姓名"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- 會員級別 (僅在 edit 模式顯示) -->
          <div v-if="pageAction === 'edit'">
            <label class="mb-2 block font-bold">會員級別</label>
            <input
              v-model="formData.level"
              type="text"
              placeholder="請輸入身分證字號"
              class="w-full rounded border border-gray-300 bg-gray-100 p-2"
              disabled
            />
          </div>

          <!-- 身分證字號 -->
          <div>
            <label class="mb-2 block font-bold">身分證字號</label>
            <input
              v-model="formData.idNumber"
              type="text"
              placeholder="請輸入身分證字號"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- 性別 -->
          <div>
            <label class="mb-2 font-bold text-red-500">*</label>性別
            <select
              v-model="formData.gender"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            >
              <option
                v-for="gender in genderList"
                :key="gender.value"
                :value="gender.value"
              >
                {{ gender.name }}
              </option>
            </select>
          </div>

          <!-- 出生日期 -->
          <div>
            <label class="mb-2 font-bold text-red-500">*</label>出生日期
            <datepicker
              v-model="formData.birthDate"
              :clearable="true"
              :enableTimePicker="false"
              placeholder="請選擇出生日期"
            />
          </div>
        </div>

        <!-- 聯絡資料 -->
        <div class="text-style mb-4 mt-8">聯絡資料</div>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="mb-2 font-bold text-red-500">*</label>主要通訊地址
            <div class="grid grid-cols-3 gap-4">
              <select
                v-model="formData.mainAddressCity"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              >
                <option
                  v-for="city in cityList"
                  :key="city.locationId"
                  :value="city.locationId"
                >
                  {{ city.name }}
                </option>
              </select>
              <select
                v-model="formData.mainAddressDistrict"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              >
                <option
                  v-for="district in districtList"
                  :key="district.locationId"
                  :value="district.locationId"
                >
                  {{ district.name }}
                </option>
              </select>
              <input
                v-model="formData.mainAddressPostal"
                type="text"
                placeholder="郵遞區號"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div class="mt-4 grid grid-cols-1 gap-4">
              <input
                v-model="formData.mainAddressDetail"
                type="text"
                placeholder="請輸入道路名/街/里/巷弄號，如：中正路100號16樓之3"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- 主要聯絡電話 -->
          <div>
            <label class="mb-2 font-bold text-red-500">*</label>主要聯絡電話
            <input
              v-model="formData.mainPhone"
              type="text"
              placeholder="手機範例：0900123987，市話範例：02-21113333"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- 次要通訊地址 -->
          <div>
            <label class="mb-2 block font-bold">次要通訊地址</label>
            <input
              type="checkbox"
              v-model="followMainAddress"
              class="mr-2"
            />同主要通訊地址
            <div class="mt-2 grid grid-cols-3 gap-4">
              <select
                v-model="formData.secondaryAddressCity"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              >
                <option
                  v-for="city in secondaryCityList"
                  :key="city.locationId"
                  :value="city.locationId"
                >
                  {{ city.name }}
                </option>
              </select>
              <select
                v-model="formData.secondaryAddressDistrict"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              >
                <option
                  v-for="district in secondaryDistrictList"
                  :key="district.locationId"
                  :value="district.locationId"
                >
                  {{ district.name }}
                </option>
              </select>
              <input
                v-model="formData.secondaryAddressPostal"
                type="text"
                placeholder="郵遞區號"
                class="w-full rounded border border-gray-300 bg-gray-100 p-2"
                readonly
              />
              <input
                v-model="formData.secondaryAddressDetail"
                type="text"
                placeholder="請輸入道路名/街/里/巷弄號，如：中正路100號16樓之3"
                class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- 次要聯絡電話 -->
          <div>
            <label class="mb-2 block font-bold">次要聯絡電話</label>
            <input
              type="checkbox"
              v-model="followMainPhone"
              class="mr-2"
            />同主要聯絡電話
            <input
              v-model="formData.secondaryPhone"
              type="text"
              placeholder="請輸入次要聯絡電話"
              class="mt-2 w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- 電子郵件信箱 -->
          <div>
            <label class="mb-2 block font-bold"
              ><label class="mb-2 font-bold text-red-500">*</label
              >電子郵件信箱</label
            >
            <div class="relative flex">
              <input
                v-model="formData.email"
                type="email"
                placeholder="請輸入電子郵件信箱"
                class="w-full rounded-l border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
                :disabled="isLocked"
              />
              
              <button
                class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded px-2 text-blue-800"
                @click="studentEmail"
              >
                取得驗證碼
              </button>
              
            </div>
            <span v-if="showError && emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</span>
          </div>

          <div class="flex content-center gap-1">
            <input
              v-model="formData.verifyCode"
              type="text"
              placeholder="請輸入驗證碼"
              class="mt-2 w-1/2 rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
              :disabled="isLocked"
            />
            <button
              class="mt-2 rounded px-4"
              :class="
                formData.verifyCode === ''
                  ? 'border border-slate-300 text-slate-300'
                  : 'border border-blue-800 text-blue-800'
              "
              :disabled="formData.verifyCode === ''"
              @click="studentVerifyEmail"
            >
              驗證
            </button>
          </div>
        </div>
        <!-- 其他資料 -->
        <div class="text-style mb-4 mt-8">其他資料</div>
        <div class="grid grid-cols-1 gap-4">
          <!-- 最高學歷 -->
          <div class="grid grid-cols-4 gap-1">
            <input
              v-model="formData.education"
              type="text"
              placeholder="學歷"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
            <input
              v-model="formData.graduationYear"
              type="text"
              placeholder="畢業年份"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500"
            />
            <input
              v-model="formData.schoolMajor"
              type="text"
              placeholder="請輸入就讀學校與科系"
              class="w-full rounded border border-gray-300 p-2 focus:ring-1 focus:ring-blue-500 col-span-2"
            />
          </div>

          <!-- 是否寄送會刊與資料 -->
          <div class="col-span-12">
            <div class="mb-2 font-bold">是否寄送會刊與資料</div>
            <div class="grid gap-2">
              <!-- 不寄送會刊 -->
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="formData.magazineSubscription"
                  class="form-checkbox h-5 w-5 text-blue-600"
                />
                <label class="ml-2 text-gray-700">不寄送會刊</label>
              </div>

              <!-- 不寄送資料 -->
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="formData.infoSubscription"
                  class="form-checkbox h-5 w-5 text-blue-600"
                />
                <label class="ml-2 text-gray-700">不寄送資料</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cardAction">
        <div class="flex justify-end space-x-2">
          <button
            class="rounded bg-white px-6 py-2 border border-zinc-800 text-zinc-800 hover:bg-slate-100"
            @click="closeDialog"
          >
            返回
          </button>
          <!-- <button
            type="submit"
            class="rounded px-6 py-2 text-white font-normal bg-logoColor hover:bg-logoColor-dark"
            :disabled="!isFormValid"
            @click="submitMember"
          >
            確定提交
          </button> -->
          <button
            type="submit"
            class="rounded px-6 py-2 text-white font-normal bg-logoColor hover:bg-logoColor-dark"
            @click="submitMember"
          >
            確定提交
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import studentSrv from '@/service/studentMember.js'
import headerHelper from '@/utils/helpers/header.js'
import locationData from '@/utils/helpers/locationList.js'
import swalWithCustomStyles from '@/utils/sweetAlert'
// import LoadingComponent from '@/components/LoadingComponent.vue';

export default {
  setup() {},
  components: {
    Datepicker
    // LoadingComponent,
  },
  data() {
    return {
      reduce: {
        type: Function,
        default: (option) => option
      },
      tab: 1,
      search: '',
      textFieldRule: [(v) => !!v || '此欄位為必填'],
      selectRule: [(v) => !!v || '此欄位為必填'],
      branchList: ['台北分會', '高雄分會'],
      formData: {
        frontUserId: '',
        password: '',
        chineseName: '',
        englishName: '',
        idNumber: '',
        gender: null,
        birthDate: '',
        mainAddressCity: null,
        mainAddressDistrict: null,
        mainAddressPostal: '',
        mainAddressDetail: '',
        mainPhone: '',
        secondaryAddressCity: null,
        secondaryAddressDistrict: null,
        secondaryAddressPostal: '',
        secondaryAddressDetail: '',
        secondaryPhone: '',
        email: '',
        education: '',
        graduationYear: '',
        schoolMajor: '',
        industry: '',
        company: '',
        position: '',
        entryDate: '',
        branch: null,
        level: null,
        paymentStatus: null,
        subscriptionStatus: '正常',
        magazineSubscription: null,
        infoSubscription: null,
        verifyCode: ''
      },
      followMainAddress: false,
      followMainPhone: false,
      pageAction: 'add',
      pageTitle: '',
      branchList: [
        {
          name: '台北分會',
          value: 1
        },
        {
          name: '高雄分會',
          value: 2
        }
      ],
      cityList: [],
      secondaryCityList: [],
      districtList: [],
      secondaryDistrictList: [],
      genderList: [
        {
          name: '女',
          value: 0
        },
        {
          name: '男',
          value: 1
        }
      ],
      valid: false,
      loading: false,
      isLocked: false,
      showError: false,
    }
  },
  mounted() {
    // this.initEditor()
    this.getLocationList()

  },
  watch: {
    followMainAddress(val) {
      if (val) {
        this.formData.secondaryAddressCity = this.formData.mainAddressCity
        this.formData.secondaryAddressDistrict =
          this.formData.mainAddressDistrict
        this.formData.secondaryAddressPostal = this.formData.mainAddressPostal
        this.formData.secondaryAddressDetail = this.formData.mainAddressDetail
      } else {
        this.formData.secondaryAddressCity = null
        this.formData.secondaryAddressDistrict = null
        this.formData.secondaryAddressPostal = ''
        this.formData.secondaryAddressDetail = ''
      }
    },
    followMainPhone(val) {
      if (val) {
        this.formData.secondaryPhone = this.formData.mainPhone
      } else {
        this.formData.secondaryPhone = ''
      }
    },
    'formData.mainAddressCity': {
      handler(val) {
        const matchCity = this.cityList.find((city) => city.locationId === val)
        const districtList = matchCity.children
        const mainPostal = matchCity.postalCode
        this.districtList = districtList
        this.formData.mainAddressPostal = mainPostal
      },
      deep: true
    },
    'formData.secondaryAddressCity': {
      handler(val) {
        const matchCity = this.secondaryCityList.find(
          (city) => city.locationId === val
        )

        // 因為有同主要地址的checkbox，所以要判斷是否有matchCity，這樣 checkbox 才能順利切換
        if (matchCity) {
          const districtList = matchCity.children
          const secondaryPostal = matchCity.postalCode
          this.secondaryDistrictList = districtList
          this.formData.secondaryAddressPostal = secondaryPostal
        }
      },
      deep: true
    }
  },
  computed: {
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.formData.email);
    },
    // 動態設定錯誤訊息
    emailError() {
      if (!this.formData.email) {
        return '請輸入電子郵件信箱';
      } else if (!this.isEmailValid) {
        return '請輸入有效的電子郵件格式';
      }
      return '';
    },
    isFormValid() {
      // 檢查每個必填欄位是否有值
      return (
        this.formData.chineseName &&
        this.formData.gender &&
        this.formData.birthDate &&
        this.formData.mainAddressCity &&
        this.formData.mainAddressDistrict &&
        this.formData.mainAddressPostal &&
        this.formData.mainAddressDetail &&
        this.formData.mainPhone &&
        this.formData.email &&
        this.formData.verifyCode
      );
    },
  },
  methods: {
    setPage() {
      const action = this.$route.query.action
      this.pageAction = action
      if (action === 'add') {
        this.pageTitle = '新增會員'
      } else if (action === 'edit') {
        const store = usePersonalStore()
        const editDataStore = storeToRefs(store)
        const editData = editDataStore.editData.value
        this.pageTitle = `會員資料編輯-${editData.frontUserId}${editData.Individuals[0].chineseName}`
        this.formData = editData.Individuals[0]
      }
      this.$router.replace('/admin/studentView')
    },
    transformDate(date) {
      if (date) {
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()

        // 將月份和日期補0
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day

        return `${year}-${month}-${day}`
      }
      return ''
    },
    passwordGenerator() {
      const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const digits = '0123456789'

      // 確保有 2 個大寫和 2 個小寫字母
      let upperLetters = ''
      let lowerLetters = ''
      while (upperLetters.length < 2) {
        const char = letters.charAt(Math.floor(Math.random() * 26) + 26) // 大寫字母
        if (!upperLetters.includes(char)) upperLetters += char
      }
      while (lowerLetters.length < 2) {
        const char = letters.charAt(Math.floor(Math.random() * 26)) // 小寫字母
        if (!lowerLetters.includes(char)) lowerLetters += char
      }

      // 生成 8 個隨機數字
      let randomDigits = ''
      for (let i = 0; i < 8; i++) {
        randomDigits += digits.charAt(Math.floor(Math.random() * digits.length))
      }

      // 組合密碼並打亂順序
      const password = (upperLetters + lowerLetters + randomDigits)
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('')

      return password
    },
    async getLocationList() {
      this.cityList = locationData
      this.secondaryCityList = locationData
      // try{
      //   await studentSrv.getLocationList(headers).then((res) => {
      //     if(res.isSuccess){
      //       this.cityList = res.data.data
      //       this.secondaryCityList = res.data.data
      //     }
      //   }).catch((error) => {
      //     swalWithCustomStyles.fire({
      //       toast: true,
      //       position: 'center',
      //       title: `${error}`,
      //       confirmButtonColor: '#0E2A34',
      //       confirmButtonText: '確認',
      //       background: '#F0F0F2',
      //       width: 400
      //     });
      //   });
      // }catch{

      // }
    },
    async studentEmail() {
      this.showError = true;

      if (!this.isEmailValid) {
        return;
      }
      
      try {
        const obj = {
          email: this.formData.email
        }
        console.log(obj)
        await studentSrv
          .studentEmail(obj)
          .then((res) => {
            if (res.isSuccess) {
              // rtnCode 為 0000 的情況
              if (res.data.rtnCode === '0000') {
                swalWithCustomStyles.fire({
                  toast: true,
                  position: 'center',
                  title: `${res.data.rtnMsg}`,
                  confirmButtonColor: '#0E2A34',
                  confirmButtonText: '確認',
                  background: '#F0F0F2',
                  width: 400
                }).then((result) => {
                  if (result.isConfirmed) {
                    // this.$router.push('/admin/Member');
                  }
                })
              } else {
                // rtnCode 不為 0000 的情況
                swalWithCustomStyles.fire({
                  toast: true,
                  position: 'center',
                  title: `${res.data.rtnMsg}`,
                  confirmButtonColor: '#0E2A34',
                  confirmButtonText: '確認',
                  background: '#F0F0F2',
                  width: 400
                })
              }
            } else {
              // api 回傳失敗
              swalWithCustomStyles.fire({
                toast: true,
                position: 'center',
                title: `${res.msg}`,
                confirmButtonColor: '#0E2A34',
                confirmButtonText: '確認',
                background: '#F0F0F2',
                width: 400
              })
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      } catch {
        swalWithCustomStyles.fire({
          toast: true,
          position: 'center',
          title: `${error}`,
          confirmButtonColor: '#0E2A34',
          confirmButtonText: '確認',
          background: '#F0F0F2',
          width: 400
        })
      }
    },
    async verifyEmail() {
      try {
        const obj = {
          email: this.formData.email
        }
        await studentSrv
          .verifyEmail(obj)
          .then((res) => {
            if (res.isSuccess) {
              // rtnCode 為 0000 的情況
              if (res.data.rtnCode === '0000') {
                swalWithCustomStyles.fire({
                  toast: true,
                  position: 'center',
                  title: `${res.data.rtnMsg}`,
                  confirmButtonColor: '#0E2A34',
                  confirmButtonText: '確認',
                  background: '#F0F0F2',
                  width: 400
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$router.push('/admin/Member')
                  }
                })
              } else {
                // rtnCode 不為 0000 的情況
                swalWithCustomStyles.fire({
                  toast: true,
                  position: 'center',
                  title: `${res.data.rtnMsg}`,
                  confirmButtonColor: '#0E2A34',
                  confirmButtonText: '確認',
                  background: '#F0F0F2',
                  width: 400
                })
              }
            } else {
              // api 回傳失敗
              swalWithCustomStyles.fire({
                toast: true,
                position: 'center',
                title: `${res.data.data.rtnMsg}`,
                confirmButtonColor: '#0E2A34',
                confirmButtonText: '確認',
                background: '#F0F0F2',
                width: 400
              })
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      } catch {
        swalWithCustomStyles.fire({
          toast: true,
          position: 'center',
          title: `${error}`,
          confirmButtonColor: '#0E2A34',
          confirmButtonText: '確認',
          background: '#F0F0F2',
          width: 400
        })
      }
    },
    async studentVerifyEmail() {
      try {
        const obj = {
          email: this.formData.email,
          verifyCode: this.formData.verifyCode
        }
        await studentSrv
          .studentVerifyEmail(obj)
          .then((res) => {
            if (res.isSuccess) {
              // rtnCode 為 0000 的情況
              if (res.data.rtnCode === '0000') {
                swalWithCustomStyles.fire({
                  toast: true,
                  position: 'center',
                  title: `${res.data.rtnMsg}`,
                  confirmButtonColor: '#0E2A34',
                  confirmButtonText: '確認',
                  background: '#F0F0F2',
                  width: 400
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.isLocked = true;
                    // this.$router.push('/admin/Member')
                  }
                })
              } else {
                // rtnCode 不為 0000 的情況
                swalWithCustomStyles.fire({
                  toast: true,
                  position: 'center',
                  title: `${res.data.rtnMsg}`,
                  confirmButtonColor: '#0E2A34',
                  confirmButtonText: '確認',
                  background: '#F0F0F2',
                  width: 400
                })
              }
            } else {
              // api 回傳失敗
              swalWithCustomStyles.fire({
                toast: true,
                position: 'center',
                title: `${res.data.data.rtnMsg}`,
                confirmButtonColor: '#0E2A34',
                confirmButtonText: '確認',
                background: '#F0F0F2',
                width: 400
              })
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      } catch {
        swalWithCustomStyles.fire({
          toast: true,
          position: 'center',
          title: `${error}`,
          confirmButtonColor: '#0E2A34',
          confirmButtonText: '確認',
          background: '#F0F0F2',
          width: 400
        })
      }
    },
    async submitMember() {
      this.loading = true
      try {
        const obj = {
          // frontUserId: this.formData.frontUserId,
          // password: this.passwordGenerator(),
          chineseName: this.formData.chineseName,
          englishName: this.formData.englishName,
          idNumber: this.formData.idNumber,
          gender: parseInt(this.formData.gender),
          birthDate:
            this.pageAction === 'add'
              ? this.transformDate(this.formData.birthDate)
              : this.formData.birthDate,
          mainAddressCity: this.formData.mainAddressCity,
          mainAddressDistrict: this.formData.mainAddressDistrict,
          mainAddressPostal: this.formData.mainAddressPostal,
          mainAddressDetail: this.formData.mainAddressDetail,
          mainPhone: this.formData.mainPhone,
          secondaryAddressCity: this.formData.secondaryAddressCity,
          secondaryAddressDistrict: this.formData.secondaryAddressDistrict,
          secondaryAddressPostal: this.formData.secondaryAddressPostal,
          secondaryAddressDetail: this.formData.secondaryAddressDetail,
          secondaryPhone: this.formData.secondaryPhone,
          email: this.formData.email,
          education: this.formData.education,
          graduationYear: this.formData.graduationYear,
          schoolMajor: this.formData.schoolMajor,
          subscriptionStatus: this.formData.subscriptionStatus,
          magazineSubscription: !this.formData.magazineSubscription
            ? 1
            : 0,
          infoSubscription: !this.formData.infoSubscription ? 1 : 0,
          verifyCode: this.formData.verifyCode
        }
        // const apiName = this.pageAction === 'add' ? 'postMember' : 'putMember'
        // const id = obj.frontUserId
        studentSrv.postMember(obj)
          .then((res) => {
            // api 回傳成功
            if (res.isSuccess) {
              // rtnCode 為 0000 的情況
              if (res.data.rtnCode === '0000') {
                this.$router.push('/apply')
                // swalWithCustomStyles.fire({
                //   toast: true,
                //   position: 'center',
                //   title: `${res.data.rtnMsg}`,
                //   confirmButtonColor: '#0E2A34',
                //   confirmButtonText: '確認',
                //   background: '#F0F0F2',
                //   width: 400
                // }).then((result) => {
                //   if (result.isConfirmed) {
                //     this.$router.push('/apply')
                //   }
                // })
              } else {
                // rtnCode 不為 0000 的情況
                swalWithCustomStyles.fire({
                  toast: true,
                  position: 'center',
                  title: `${res.data.rtnMsg}`,
                  confirmButtonColor: '#0E2A34',
                  confirmButtonText: '確認',
                  background: '#F0F0F2',
                  width: 400
                })
              }
            } else {
              // api 回傳失敗
              swalWithCustomStyles.fire({
                toast: true,
                position: 'center',
                title: `${res.data.data.rtnMsg}`,
                confirmButtonColor: '#0E2A34',
                confirmButtonText: '確認',
                background: '#F0F0F2',
                width: 400
              })
            }
          })
          .catch((error) => {
            // 處理錯誤情況
            console.error('Error:', error)
          })
          .finally(() => {
            // 無論成功或失敗都會執行，目前至少先關閉 loading，之後再依需求調整
            this.loading = false
          })
      } catch (error) {
        swalWithCustomStyles.fire({
          toast: true,
          position: 'center',
          title: `${error}`,
          confirmButtonColor: '#0E2A34',
          confirmButtonText: '確認',
          background: '#F0F0F2',
          width: 400
        })
        this.loading = false
      }
    },
    closeDialog() {
      this.$emit('close')
    },
    toPrev() {
      this.$router.push('/admin/Member')
    }
  }
}
</script>

<style scoped>
.text-red {
  color: crimson;
  font-weight: 900;
  margin-right: 4px;
}
.bold {
  font-size: 16px;
  font-weight: 700;
}

:deep(.v-selection-control--density-default) {
  --v-selection-control-size: 30px !important;
}
:deep(.v-selection-control__input) {
  align-items: center;
  display: flex;
  flex: none;
  justify-content: flex-start;
  position: relative;
  border-radius: 50%;
  padding: 0px !important;
}
.custom-checkbox {
  height: 24px;
  line-height: 24px;
}
.end {
  justify-content: flex-end;
}

.text-style {
  font-size: 20px;
  font-weight: 600;
  color: #1b2482;
  padding: 4px;
  border-left: 8px solid #1b2482;
}

.overlay {
  background-color: rgba(34, 34, 34, 0.6);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;

  .card {
    position: relative;
    background-color: white;
    width: 50%;
    height: 80vh;
    margin: 5% auto 10% auto;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .cardHeader {
      position: absolute;
      top: 0px;
      width: 100%;
      padding: 10px 30px;
      background-color: white;
    }
    .cardBody {
      height: 100%;
      overflow-y: scroll;
      padding: 60px 20px 150px 20px;
    }
    .cardAction {
      position: absolute;
      bottom: 0px;
      padding: 20px;
      background-color: white;
      width: 100%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
}
@media screen and (max-width: 768px) {
  .overlay .card {
    width: 100%; /* 調整為較窄的寬度 */
    height: 100vh; /* 調整高度 */
    margin: 0px;
    z-index: 100;
  }

  .overlay .card .cardBody {
    padding: 40px 15px 100px 15px; /* 調整內邊距 */
  }

  .overlay .card .cardAction {
    padding: 15px; /* 調整按鈕區域內邊距 */
  }
}

.d-flex {
  display: flex;
}
/* button:disabled {
  background-color: rgb(226 232 240);
  cursor: not-allowed;
} */
</style>
