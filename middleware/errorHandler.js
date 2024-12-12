export default defineNuxtMiddleware((context) => {
  const validRoutes = [
    '/', '/news', '/contact', '/newsView', '/album',
    '/reset-password/:token', '/groupProfile', '/personalProfile',
    '/verify', '/admin', '/admin/dashboard', '/admin/announcement',
    '/admin/announcementView', '/admin/publication', '/admin/academic',
    '/admin/academicView', '/admin/quarterly', '/admin/quarterlyView',
    '/admin/member', '/admin/personalView', '/admin/personalPaymentView',
    '/admin/PrintPage', '/admin/printInvoice', '/admin/groupView',
    '/admin/groupPaymentView', '/admin/studentView',
  ]; 

  // 檢查路徑是否匹配
  const currentPath = context.route.fullPath; // 獲取當前完整路徑
  const isMatched = validRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}$`);
    return regex.test(currentPath);
  });

  if (!isMatched) {
    return context.redirect('/404'); // 跳轉到自定義錯誤頁面
  }
});
