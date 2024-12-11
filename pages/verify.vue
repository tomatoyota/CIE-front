<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="sand-animation">
      <span v-if="currentIcon.value === 0"><Icon name="mdi-timer-sand" /></span>
      <span v-if="currentIcon.value === 1"><Icon name="mdi-timer-sand-paused" /></span>
      <span v-if="currentIcon.value === 2"><Icon name="mdi-timer-sand-complete" /></span>
      <span v-if="currentIcon.value === 3"><Icon name="mdi-timer-sand-paused" /></span>
      <div>請稍候</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import swalWithCustomStyles from '@/utils/sweetAlert';

export default {
  name: "SandAnimation",
  setup() {
    const currentIcon = ref(0); // 當前顯示的圖示索引

    const startAnimation = () => {
      setInterval(() => {
        currentIcon.value = (currentIcon.value + 1) % 4; // 0 -> 1 -> 2 -> 3 -> 0 循環
      }, 500);
    };

    const tokenVerfy = async () => {
  update.value = false

  const input = verfyUrl.value.trim()

  // if (!input) {
  //   VerfyErrormsg.value = true
  //   rtnMsg.value = '請輸入驗證連結'
  //   return
  // }

  const urlParams = new URLSearchParams(input.split('?')[1])
  const token = urlParams.get('token')
  const email = urlParams.get('email')
  console.log('token:', token)
  console.log('email:', email)
  if (!token || !email) {
    // emailErrormsg.value = true
    // rtnMsg.value = '驗證連結格式不正確，請檢查後重新輸入'
    console.log('驗證連結格式不正確，請檢查後重新輸入')
    return
  }
  const obj = {
    email: email,
    token: token
  }

  const verifyResponse = await testSrv.sendVerificationEmail(obj)
  console.log('verifyResponse:', verifyResponse)
  if (verifyResponse.isSuccess === true) {
    // alert('驗證郵件已發送到您的電子郵件地址');
    emailSentErr.value = false
    showSuccess.value = true
    rtnMsg.value = verifyResponse.rtnMsg
    console.log('驗證郵件已發送到您的電子郵件地址:', verifyResponse)
    const userAccount = verifyResponse.userAccount
    if (userAccount) {
      localStorage.setItem('userAccount', userAccount)
      console.log('userAccount 已儲存:', userAccount)
    } else {
      console.warn('回應中未包含 userAccount')

      rtnMsg.value = verifyResponse.rtnMsg
    }
    emailSent.value = false
    update.value = true
  } else {
    // alert('發送驗證郵件失敗: ' + verifyResponse.msg);
    // emailErrormsg.value = ture
    emailSentErr.value = true
    ErrrtnMsg.value = verifyResponse.msg
    console.log('發送驗證郵件失敗:', verifyResponse)
  }
}

    onMounted(() => {
      startAnimation();
    });

    return {
      currentIcon
    };
  },
};
</script>

<style scoped>
.sand-animation {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 2rem; /* 可調整圖示大小 */
}
</style>
