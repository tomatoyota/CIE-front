
<template>
  <!-- 提醒視窗 -->
  <!-- <div class="d-lg-flex login-container model-width mx-auto my-auto rounded">
    <div class="absolute right-4 top-4">
        <Icon
          name="mi:close"
          class="outlinkIcon text-2xl"
          @click="$emit('closeMenu')"
        />
      </div>
      <div class="flex flex-col">
                <div class="sussess">
                  <Icon
                    name="mdi-check-circle-outline"
                    class="outlinkIcon mr-4 text-2xl"
                  />
                  <div class="flex-1">{{ rtnMsg }}</div>
                </div>

                <button
                  @click="changeView('login')"
                  class="mb-10 flex-1 rounded-lg bg-gray-900 px-32 py-4 font-thin text-gray-100"
                >
                  返回會員登入
                </button>
              </div>
  </div> -->

  <form>
  <div class="flex justify-center items-start min-h-[40vh]">
    
  <form class="w-[60%] max-w-[1200px]">
    <h1 class="text-xl font-bold mb-4">修改個人會員</h1>
    <h3 class="flex items-center text-style font-bold text-lg mb-4">
      基本資料
    </h3>
    
    <div class="flex flex-col gap-4 py-4">
      <!-- 會員證號 -->
      <!-- <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[500px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>會員證號
          </label>
          <input 
            type="text" 
            id="frontUserId" 
            name="frontUserId" 
            placeholder="請輸入證號"
            class="w-full p-4 border border-gray-300 rounded-md"
          />
        </div>
        <div class="flex-1 max-w-[500px]"></div>
      </div> -->

      <!-- Chinese and English Names -->
      <div class="flex items-center gap-4">
          <div class="max-w-[500px] flex-1">
            <label class="block font-bold">
              <span class="mr-1 text-red-500">*</span>中文名稱
            </label>
            <input
              type="text"
              v-model="ModifyCondition.chineseName"
              placeholder="請輸入中文名稱"
              class="w-full rounded border border-gray-300 p-2"
              :disabled="DisabledchineseName"
            />
          </div>
          <div class="max-w-[500px] flex-1">
            <label class="block font-bold"> 英文名稱 </label>
            <input
              type="text"
              v-model="ModifyCondition.englishName"
              placeholder="請輸入英文名稱"
              class="w-full rounded border border-gray-300 p-2"
              :disabled="DisabledenglishName"
            />
          </div>
        </div>

      <!-- 身分證字號 -->
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[500px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>身分證字號
          </label>
          <input 
            type="text" 
            v-model="ModifyCondition.idNumber"
            placeholder="請輸入身分證字號"
            class="w-full p-4 border border-gray-300 rounded-md"
            :disabled="DisabledidNumber"
          />
        </div>
        <div class="flex-1 max-w-[500px]"></div>
      </div>

      <!-- 性別 -->
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[500px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>性別
          </label>
          <select
                v-model="ModifyCondition.gender"
                placeholder="請選擇性別"
                class="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                :disabled="Disabledgender"
            >
              <option value="" disabled selected>請選擇性別</option>
              <option value=1>男性</option>
              <option value=0>女性</option>
            </select>
        </div>
        <div class="flex-1 max-w-[500px]"></div>
      </div>

      <!-- 出生日期 -->
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[500px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>出生日期
          </label>
          <VueDatePicker
              label="出生日期"
              v-model="ModifyCondition.birthday"
              @update:modelValue="handleDateUpdate"
              :teleport="true"
              format="yyyy/MM/dd"
              placeholder="出生日期"
              :text-input="birthdayEditOption"
              :enable-time-picker="false"
              :disabled="Disabledbirthday"
            >
            </VueDatePicker>
        </div>
        <div class="flex-1 max-w-[500px]"></div>
      </div>
    </div>
  </form>
</div>

<div class="flex justify-center items-start min-h-[40vh]">
  <form class="w-3/5 max-w-[1200px]">
    <h3 class="my-4 flex items-center text-lg font-bold text-style">
      聯絡資料
    </h3>

    <div class="flex flex-col gap-4 py-4">
      <!-- 主要通訊地址 -->
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[330px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>主要通訊地址
          </label>
          <select
            v-model="ModifyCondition.mainAddressCity"
            placeholder="請選擇縣市"
            class="w-full rounded border border-gray-300 p-2"
          >
            <option value="" disabled selected>請選擇縣市</option>
            <option
              v-for="cityitem in LocationList"
              :key="cityitem.locationId"
              :value="cityitem.locationId"
            >
              {{ cityitem.name }}
            </option>
          </select>
        </div>
        <div class="flex-1 max-w-[330px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>地區
          </label>
          <select
            v-model="ModifyCondition.mainAddressDistrict"
            placeholder="請選擇區域"
            class="w-full rounded border border-gray-300 p-2"
            :disabled="DisabledlocationCounty"
          >
            <option value="" disabled selected>請選擇區域</option>
            <option
              v-for="countyitem in countyList"
              :key="countyitem.locationId"
              :value="countyitem.locationId"
            >
              {{ countyitem.name }}
            </option>
          </select>
        </div>
        <div class="flex-1 max-w-[330px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>郵遞區號
          </label>
          <input
            type="text"
            v-model="ModifyCondition.mainAddressPostal"
            placeholder="請輸入郵遞區號"
            class="w-full rounded border border-gray-300 p-2"
          />
        </div>
      </div>

      <!-- 詳細地址 -->
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[1025px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>詳細地址
          </label>
          <input 
              type="text"
              v-model="ModifyCondition.mainAddressDetail"
              placeholder="請輸入道路名/街/里/巷弄號，如：中正路100號16樓之3"
              class="w-full rounded border border-gray-300 p-2"
            />
        </div>
      </div>

      <!-- 主要聯絡電話 -->
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[1025px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>主要聯絡電話
          </label>
          <input
              type="text"
              v-model="ModifyCondition.mainPhone"
              placeholder="手機範例：0900123987，市話範例：02-21113333"
              class="w-full rounded border border-gray-300 p-2"
            />
        </div>
      </div>

      <!-- 同主要通訊地址 -->
      <div class="flex-1 max-w-[1025px]">
        <input 
          type="checkbox" 
          id="address1" 
          name="address1" 
          v-model="sameAddress" 
        />
        <label for="sameAddress">同主要通訊地址</label>
      </div>

      <!-- 次要通訊地址 -->
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[330px]">
          <label class="block font-bold">次要通訊地址</label>
          <select
            v-model="ModifyCondition.secondaryAddressCity"
            placeholder="請選擇縣市"
            class="w-full rounded border border-gray-300 p-2"
            :disabled="DisabledsecondaryAddressCity"
          >
            <option value="" disabled selected>請選擇縣市</option>
            <option
              v-for="cityitem in LocationList2"
              :key="cityitem.locationId"
              :value="cityitem.locationId"
            >
              {{ cityitem.name }}
            </option>
          </select>
        </div>
        <div class="flex-1 max-w-[330px]">
          <label class="block font-bold">地區</label>
          <select
            v-model="ModifyCondition.secondaryAddressDistrict"
            placeholder="請選擇區域"
            class="w-full rounded border border-gray-300 p-2"
            :disabled="DisabledlocationCounty2"
          >
            <option value="" disabled selected>請選擇區域</option>
            <option
              v-for="countyitem in countyList2"
              :key="countyitem.locationId"
              :value="countyitem.locationId"
            >
              {{ countyitem.name }}
            </option>
          </select>
        </div>
        <div class="flex-1 max-w-[330px]">
          <label class="block font-bold">郵遞區號</label>
          <input
            type="text"
            v-model="ModifyCondition.secondaryAddressPostal"
            placeholder="請輸入郵遞區號"
            class="w-full rounded border border-gray-300 p-2"
            :disabled="DisabledsecondaryAddressPostal"
          />
        </div>
      </div>

      <!-- 次要詳細地址 -->
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[1025px]">
          <label class="block font-bold">詳細地址</label>
          <input 
              type="text"
              v-model="ModifyCondition.secondaryAddressDetail"
              placeholder="請輸入道路名/街/里/巷弄號，如：中正路100號16樓之3"
              class="w-full rounded border border-gray-300 p-2"
            :disabled="DisabledsecondaryAddressDetail"
            />
        </div>
      </div>

      <!-- 同主要聯絡電話 -->
      <div class="flex-1 max-w-[1025px]">
        <input 
          type="checkbox" 
          id="tel1" 
          name="tel1" 
          v-model="sameTel" 
        />
        <label for="tel1">同主要聯絡電話</label>
      </div>

      <!-- 次要聯絡電話 -->
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[1025px]">
          <label class="block font-bold">次要聯絡電話</label>
          <input
              type="text"
              v-model="ModifyCondition.secondaryPhone"
              placeholder="手機範例：0900123987，市話範例：02-21113333"
              class="w-full rounded border border-gray-300 p-2"
              :disabled="DisabledsecondaryPhone"
            />
        </div>
      </div>

      <!-- 電子郵件信箱 -->
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[1025px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>電子郵件信箱
          </label>
          <input
            type="text"
            v-model="ModifyCondition.email"
            placeholder="請輸入電子郵件信箱"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  </form>
</div>

<div class="flex justify-center items-start min-h-[40vh]">
  <form class="w-3/5 max-w-[1200px]">
    <h3 class="flex items-center my-4 text-lg font-bold text-style">
      其他資料
    </h3>

    <!-- 最高學歷 -->
    <h5 class="flex items-center m-0 text-base font-bold">最高學歷</h5>
    <div class="flex items-center gap-4">
      <div class="flex-1 max-w-[330px]">
        <input 
          type="text" 
          v-model="ModifyCondition.education"
          placeholder="學歷" 
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="flex-1 max-w-[330px]">
        <input 
          type="text"
          v-model="ModifyCondition.graduationYear"
          placeholder="畢業年份" 
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="flex-1 max-w-[330px]">
        <input 
          type="text" 
          v-model="ModifyCondition.schoolMajor"
          placeholder="就讀學校" 
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    </div>

    <!-- 現職服務機關與職務 -->
    <h5 class="flex items-center m-0 text-base font-bold">現職服務機關與職務</h5>
    <div class="flex items-center gap-4">
      <div class="flex-1 max-w-[330px]">
        <input 
          type="text"
          v-model="ModifyCondition.industry"
          placeholder="行業別" 
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="flex-1 max-w-[330px]">
        <input 
          type="text" 
          v-model="ModifyCondition.company"
          placeholder="請輸入服務機關" 
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="flex-1 max-w-[330px]">
        <input 
          type="text" 
          v-model="ModifyCondition.position"
          placeholder="請輸入現任職務" 
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    </div>

    <div class="flex flex-col gap-4 py-4">
      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[1025px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>入會日期
          </label>
            <VueDatePicker
                label="入會日期"
                v-model="ModifyCondition.entryDate"
                :teleport="true"
                format="yyyy/MM/dd"
                placeholder="入會日期"
                :text-input="entryDateEditOption"
                :enable-time-picker="false"
                :disabled="DisabledentryDate"
              >
              </VueDatePicker>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[1025px]">
          <label class="block font-bold">
            <span class="text-red-500 mr-1">*</span>所屬分會
          </label>
          <select 
                v-model="ModifyCondition.branch"
                placeholder="請選擇所屬分會"
                class="w-full rounded border border-gray-300 p-2"
                :disabled="Disabledbranch"
              >
              <option value="" disabled selected>請選擇所屬分會</option>
              <option
                v-for="branchitem in BranchList"
                :key="branchitem.branchId"
                :value="branchitem.branchId"
              >
                {{ branchitem.level }}
              </option>
            </select>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex-1 max-w-[1025px]">
          <label class="block font-bold">通訊狀況</label>
          <select
                v-model="ModifyCondition.subscriptionStatus"
                placeholder="通訊狀況"
                class="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>通訊狀況</option>
              <option value="正常">正常</option>
              <option value="失聯">失聯</option>
            </select>
        </div>
      </div>

      <div class="flex-1 max-w-[1025px]">
        <h5 class="flex items-center m-0 text-base font-bold">是否寄送會刊與資料</h5>
      </div>
      <div class="flex-1 max-w-[1025px]">
        <input 
          type="checkbox" 
          id="nomail" 
          name="nomail" 
          v-model="noMail" 
        />
        <label for="nomail">不寄送會刊</label>
      </div>
      <div class="flex-1 max-w-[1025px]">
        <input 
          type="checkbox" 
          id="noinfo" 
          name="noinfo" 
          v-model="noInfo" 
        />
        <label for="nomail">不寄送資料</label>
      </div>
    </div>
  </form>
</div>

<div class="flex justify-center items-start min-h-[10vh]">
  <form class="w-3/5 max-w-[1200px]">
    <!-- Column container -->
    <div class="flex-1 max-w-[1025px]">
      <!-- Button container -->
      <div class="flex justify-end gap-4 py-4">
        <NuxtLink to="/" class="px-5 py-2 border border-black rounded cursor-pointer">
          取消
        </NuxtLink>
        <button 
        @click="putMember"
        class="px-5 py-2 bg-indigo-800 text-white rounded cursor-pointer">
          發布
        </button>
      </div>
    </div>
  </form>
</div>
</form>


</template>
<script>
import { storeToRefs } from 'pinia';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import PaginationComponent from '@/components/PaginationComponent.vue';
import swalWithCustomStyles from '@/utils/sweetAlert';
import dropSrv from '@/service/dropdown.js';

import { useRoute } from 'vue-router'
import memberServ from '@/service/memberEditFront.js'
import { LoginStore } from '@/stores/LoginStore'
import { format } from "date-fns"; // Ensure date-fns is installed

import userHelper from '@/utils/helpers/user.js'
import { useUserStore } from '@/stores/UserStore';

export default {
  components: {
        VueDatePicker,
        PaginationComponent,
        //LoadingComponent,
  },
  data(){
      return {
      ModifyCondition: {
        chineseName: '',
        englishName: '',
        idNumber: '',
        gender: null,
        birthday: '',

       /**/
        level: null,
        applicationDate: '',
        approvalDate: '',
        //industry: '', //行業別



        locationId: this.selectedCounty || this.selectedCity,

        city: [],
        county: [],
        selectedCity: null,
        selectedCounty: null,
        
        mainAddressCity: null,
        mainAddressDistrict: null,
        mainAddressPostal: null,
        mainAddressDetail: null,
        mainPhone: null,
        fax: null,
        secondaryAddressCity: null,
        secondaryAddressDistrict: null,
        secondaryAddressPostal: null,
        secondaryAddressDetail: null,
        preCity: null,
        preCounty: null,
        prePost: null,
        preAddress: null,
        secondaryPhone: null,
        previousePhone: null,
        email: null,
        education: null,
        graduationYear: null,
        schoolMajor: null,
        industry: null,
        company: null,
        position: null,
        entryDate: '',
        branch: null,
        subscriptionStatus: '',

        /**/
        responsiblePersonName: null,
        responsiblePersonPosition: null,
        responsiblePersonPhone: null,
        responsiblePersonEmail: null,

        contactName: null,
        contactPosition: null,
        contactPhone: null,
        contactEmail: null,

        frontUserId: '',
        name: '',
        paymentStatus: null,
        sortBy: 'createdAt',
        sortDirection: 'DESC',
        currentPage: 1,
        pageSize: 10,

      },
      formData: {
        chineseName: '',
        englishName: '',
        level: null,
        branch: null,
        entryDate: '',
        applicationDate: '',
        approvalDate: '',
        industry: null,
        mainAddressCity: null,
        mainAddressDistrict: null,
        mainAddressPostal: '',
        mainAddressDetail: '',
        mainPhone: '',
        fax: '',
        responsiblePersonName: '',
        responsiblePersonPosition: '',
        responsiblePersonPhone: '',
        responsiblePersonEmail: '',
        contactName: '',
        contactPosition: '',
        contactPhone: '',
        // contactEmail: '',
        representatives: [
          {
            memberId: 1,
            name: '',
            position: '',
            phone: '',
            email: ''
          },
          {
            memberId: 2,
            name: '',
            position: '',
            phone: '',
            email: ''
          },
          {
            memberId: 3,
            name: '',
            position: '',
            phone: '',
            email: ''
          },
          {
            memberId: 4,
            name: '',
            position: '',
            phone: '',
            email: ''
          }
        ]
      },
      BranchList: [],
      LocationList: [],
      countyList: [],
      LocationList2: [],
      countyList2: [],

      /**/
      selectedlevel: '',
      groupLevelList: [],
      groupMemberData: [],
      //time
      birthdayEditOption: {
        rangeSeparator: ''
      },
      entryDateEditOption: {
        rangeSeparator: ''
      },


      storageData: [], // To hold the keys and values
      userId: '',
      previousCity: null,
      previousCity2: null,

      DisabledchineseName: false,
      DisabledenglishName: false,
      Disabledgender: false,
      Disabledbirthday: false,
      DisabledsecondaryAddressCity: false,
      //DisabledsecondaryAddressDistrict: false,
      DisabledsecondaryAddressPostal: false,
      DisabledsecondaryAddressDetail: false,
      Disabledbranch: false,
      DisabledentryDate: false,

      DisabledidNumber: false,
      Disabledlevel: false,
      DisabledapplicationDate: false,
      DisabledapprovalDate: false,
      Disabledindustry: false,

      DisabledlocationCounty: false,
      DisabledlocationCounty2: false,
      noMail: false,
      noInfo: false,
      sameTel: false,
      sameAddress: false,
      DisabledsecondaryPhone: true,

      
    }
  },
  created() {
    this.checkAccessPermission();
    this.getLocationList();
    this.fetchLocalStorageData()
  },
  watch: {
    'sameTel': {
      handler(val) {
        if(val){
          this.previousePhone = this.ModifyCondition.secondaryPhone;
          this.ModifyCondition.secondaryPhone = this.ModifyCondition.mainPhone;
          this.DisabledsecondaryPhone = true;
        }else if(this.previousePhone){
          this.ModifyCondition.secondaryPhone = this.previousePhone;
          this.DisabledsecondaryPhone = false;
        }
        //console.log(val);
        //console.log(this.noMail);
      },
      deep: true
    },
    'sameAddress': {
      handler(val) {
        if(val){
          this.previousCity2 = this.ModifyCondition.mainAddressCity;
          this.countyList2 = [];
          this.ModifyCondition.secondaryAddressCity = this.ModifyCondition.mainAddressCity;
          this.ModifyCondition.secondaryAddressDistrict = this.ModifyCondition.mainAddressDistrict;
          this.ModifyCondition.secondaryAddressPostal = this.ModifyCondition.mainAddressPostal;
          this.ModifyCondition.secondaryAddressDetail = this.ModifyCondition.mainAddressDetail;
          this.DisabledsecondaryAddressCity = true;
          this.DisabledlocationCounty2 = true;
          this.DisabledsecondaryAddressPostal = true;
          this.DisabledsecondaryAddressDetail = true;
        }else if(!val){
          this.ModifyCondition.secondaryAddressCity = "";
          this.ModifyCondition.secondaryAddressDistrict = "";
          this.ModifyCondition.secondaryAddressPostal = "";
          this.ModifyCondition.secondaryAddressDetail = "";
          this.DisabledsecondaryAddressCity = false;
          this.DisabledlocationCounty2 = false;
          this.DisabledsecondaryAddressPostal = false;
          this.DisabledsecondaryAddressDetail = false;
        }
      },
      deep: true
    },
    'ModifyCondition.entryDate': {
      handler(val) {
        this.entryDateEditOption.rangeSeparator = ''
      },
      deep: true
    },
    'ModifyCondition.applicationDate': {
      handler(val) {
        this.applicationDateEditOption.rangeSeparator = ''
      },
      deep: true
    },
    'ModifyCondition.approvalDate': {
      handler(val) {
        this.approvalDateEditOption.rangeSeparator = ''
      },
      deep: true
    },
    'ModifyCondition.mainAddressCity': {
      handler(val) {
        this.ModifyCondition.mainAddressCity = val;
        if(this.countyList){
          const matchCity = this.LocationList.find((city) => city.locationId === val);
          this.countyList = matchCity.children;
        }
        if(this.previousCity != val){
          this.ModifyCondition.mainAddressDistrict = "";
        }
        //console.log(this.ModifyCondition.mainAddressDistrict);
      },
      deep: true
    },
    'ModifyCondition.secondaryAddressCity': {
      handler(val) {
        this.ModifyCondition.secondaryAddressCity = val;
        //console.log(this.countyList2);
        if(this.countyList2.length === 0){
          const matchCity = this.LocationList2.find((city) => city.locationId === val);
          this.countyList2 = matchCity.children;
          //console.log(this.countyList2);
        }
        if(this.previousCity2 === null){
          //console.log("hi");
          this.ModifyCondition.secondaryAddressDistrict = "";
        }
        //console.log(this.ModifyCondition.mainAddressDistrict);
      },
      deep: true
    },
  },
  mounted() {
    this.fetchInitialData();
    this.getPersonalMember();
    this.getGroupLevelList();
    this.getBranchList();
  },
  computed: {},
  methods: {
    fetchLocalStorageData() {
      let data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) // Get the key at index `i`
        const value = localStorage.getItem(key) // Get the value for the key
        if (key === 'this-user') {
          this.userId = value.replace(/"/g, '');// 移除多餘的雙引號
          console.log(this.userId);
        }
        data[key] = value; // Add key-value pair to the `data` object
      }
      this.storageData = data // Update the Vue data property
    },
    async getPersonalMember() {
      const loginStore = LoginStore();
      const userId = this.userId ;
      //console.log(userId)
      if (userId !== null) {
        memberServ.editPersonalProfile(userId).then((res) => {
          console.log('response:', res.data.data.Individuals);
        })
        // this.$router.push('/groupProfile');
      } else {
        console.error(
          '無法獲取 userId，請檢查用戶是否已登入或 localStorage 設置是否正確。'
        )
      }
    },
    async fetchInitialData() {
      this.loading=true;
      try {
        const res = await memberServ.editPersonalProfile(this.userId);
        if (res.isSuccess && res.data.data.Individuals.length > 0) {
          const org = res.data.data.Individuals[0];
          this.ModifyCondition.chineseName = org.chineseName;
          this.DisabledchineseName = true;
          this.ModifyCondition.englishName = org.englishName;
          this.DisabledenglishName = true;
          this.ModifyCondition.gender = org.gender;
          this.Disabledgender = true;
          this.ModifyCondition.idNumber = org.idNumber;
          this.DisabledidNumber = true;


          this.ModifyCondition.birthday = org.birthday;
          this.Disabledbirthday = true;
          
          this.ModifyCondition.level = org.level;
          this.Disabledlevel = true;
          this.ModifyCondition.branch = org.branch;
          this.Disabledbranch = true;
          this.ModifyCondition.applicationDate = org.applicationDate;
          this.DisabledapplicationDate = true;
          this.ModifyCondition.approvalDate = org.approvalDate;
          this.DisabledapprovalDate = true;
          var industryId = null;
              switch (org.industry) {
                case '製造業':
                  industryId = 1;
                  break;
                case '服務業':
                  industryId = 2;
                  break;
                case '金融業':
                  industryId = 3;
                  break;
                case '資訊業':
                  industryId = 4;
                  break;
                case '其他':
                  industryId = 5;
                  break;
              }
          this.ModifyCondition.industry = industryId;
          this.Disabledindustry = true;
          
          this.ModifyCondition.mainAddressCity = org.mainAddressCity;
          this.previousCity = org.mainAddressCity;

          this.ModifyCondition.mainAddressDistrict = org.mainAddressDistrict;
          
          this.ModifyCondition.mainAddressPostal = org.mainAddressPostal;
          this.ModifyCondition.mainAddressDetail = org.mainAddressDetail;
          this.ModifyCondition.mainPhone = org.mainPhone;
          this.ModifyCondition.fax = org.fax;

          this.ModifyCondition.secondaryAddressCity = org.secondaryAddressCity;
          this.previousCity2 = org.secondaryAddressCity;

          this.ModifyCondition.secondaryAddressDistrict = org.secondaryAddressDistrict;
          this.ModifyCondition.secondaryAddressPostal = org.secondaryAddressPostal;
          this.ModifyCondition.secondaryAddressDetail = org.secondaryAddressDetail;
          this.ModifyCondition.secondaryPhone = org.secondaryPhone;
          if(this.ModifyCondition.mainPhone != this.ModifyCondition.secondaryPhone){
              this.DisabledsecondaryPhone = false;
          }
          this.ModifyCondition.email = org.email;

          this.ModifyCondition.education = org.education;
          this.ModifyCondition.graduationYear = org.graduationYear;
          this.ModifyCondition.schoolMajor = org.schoolMajor;
          this.ModifyCondition.industry = org.industry;
          this.ModifyCondition.company = org.company;
          this.ModifyCondition.position = org.position;

          this.ModifyCondition.entryDate = org.entryDate;
          //this.DisabledentryDate = true;

          this.ModifyCondition.responsiblePersonName = org.responsiblePersonName;
          this.ModifyCondition.responsiblePersonPosition = org.responsiblePersonPosition;
          this.ModifyCondition.responsiblePersonPhone = org.responsiblePersonPhone;
          this.ModifyCondition.responsiblePersonEmail = org.responsiblePersonEmail;
          this.ModifyCondition.contactName = org.contactName;
          this.ModifyCondition.contactPosition = org.contactPosition;
          this.ModifyCondition.contactPhone = org.contactPhone;
          this.ModifyCondition.contactEmail = org.contactEmail;

          this.ModifyCondition.subscriptionStatus = org.subscriptionStatus;
          this.noMail = org.magazineSubscription;
          this.noInfo = org.infoSubscription;
          //console.log(res.data.data);
        }
      } catch (error) {
        console.error('初始化資料失敗：', error);
      }finally{
        this.loading=false;
      }
    },
    getGroupLevelList() {
      dropSrv
        .getGroupLevelList()
        .then((res) => {
          if (res.isSuccess) {
            this.groupLevelList = res.data.data
            //console.log(this.groupLevelList);
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    getBranchList() {
      dropSrv
        .getBranchList()
        .then((res) => {
          if (res.isSuccess) {
            this.BranchList = res.data.data
            //console.log(this.BranchList);
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    getLocationList() {
      dropSrv
        .getLocationList()
        .then((res) => {
          if (res.isSuccess) {
            this.LocationList = res.data.data;
            this.LocationList2 = res.data.data;
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    handleDateUpdate(selectedDate) {
      this.ModifyCondition.birthday = format(new Date(selectedDate), "yyyy/MM/dd");
    },
    putMember() {
      const frontUserId = localStorage.getItem('this-user')
      const cleanUserId = JSON.parse(frontUserId)
      console.log('cleanUserId:',cleanUserId);
      const obj = {
        frontUserId: cleanUserId,
        chineseName: this.ModifyCondition.chineseName,
        englishName: this.ModifyCondition.englishName,
        idNumber: this.ModifyCondition.idNumber,
        gender: this.ModifyCondition.gender,
        birthday: this.ModifyCondition.birthday,
        mainAddressCity: this.ModifyCondition.mainAddressCity,
        mainAddressDistrict: this.ModifyCondition.mainAddressDistrict,
        mainAddressPostal: this.ModifyCondition.mainAddressPostal,
        mainAddressDetail: this.ModifyCondition.mainAddressDetail,
        mainPhone: this.ModifyCondition.mainPhone,
        secondaryAddressCity: this.ModifyCondition.secondaryAddressCity,
        secondaryAddressDistrict: this.ModifyCondition.secondaryAddressDistrict,
        secondaryAddressPostal: this.ModifyCondition.secondaryAddressPostal,
        secondaryAddressDetail: this.ModifyCondition.secondaryAddressDetail,
        secondaryPhone: this.ModifyCondition.secondaryPhone,
        email: this.ModifyCondition.email,
        education: this.ModifyCondition.education,
        graduationYear: this.ModifyCondition.graduationYear,
        schoolMajor: this.ModifyCondition.schoolMajor,
        industry: this.ModifyCondition.industry,
        company: this.ModifyCondition.company,
        position: this.ModifyCondition.position,
        entryDate: this.ModifyCondition.entryDate,
        branch: this.ModifyCondition.branch,
        level: this.ModifyCondition.level,
        subscriptionStatus: this.ModifyCondition.subscriptionStatus,
        magazineSubscription: this.noMail,
        infoSubscription: this.noInfo,
      };
      
      memberServ.putPersonalMember(obj).then((res) => {
        // console.log('obj:',obj);
        // console.log('API 回應:', res);
        if (!res.isSuccess) {
          swalWithCustomStyles.fire({
            toast: true,
            position: 'center',
            title: `${res.msg}`,
            confirmButtonColor: '#4CAF50',
            confirmButtonText: '確認',
            width: 500
          });
          // console.log('put失敗:',res.data.rtnMsg);
        } else {
          swalWithCustomStyles.fire({
            toast: true,
            position: 'center',
            title: `${res.data.rtnMsg}`,
            confirmButtonColor: '#4CAF50',
            confirmButtonText: '確認',
            width: 500
          }).then((result) => {
            if (result.isConfirmed) {
              //this.$router.push('/admin/dataEdit');
            }
          });
          // console.log('put成功:',res.data.rtnMsg);
        }
      });
      // this.$router.push('/');
    },
    checkAccessPermission() {
      try {
      const userProfile = userHelper.getUserProfile();
      // 判斷使用者的 accountType 是否為 個人會員
      if (userProfile.accountType !== 1) {
        // 如果條件不符，跳轉至首頁
        this.$router.push('/');
      }
    } catch (error) {
      console.error('無法檢查使用者權限：', error);
      this.$router.push('/');
    }
    }
  }
}
</script>

<style scoped>
.login-container {
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 20px;
}
.text-style {
  font-size: 20px;
  font-weight: 600;
  color: #1b2482;
  padding: 4px;
  border-left: 8px solid #1b2482;
}
</style>