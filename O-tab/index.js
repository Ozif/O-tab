// 如果检测到重复实例，自动关闭
if (performance.getEntriesByType("navigation")[0].type === "reload") {
  window.close();
}

// 实时更新时间显示
function updateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    document.getElementById('time').innerHTML = now.toLocaleDateString('zh-CN', options);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 自动聚焦搜索框
    document.getElementById('search-box').focus();

    // 启动时间更新
    setInterval(updateTime, 1000);
    updateTime();
});

// 阻止空搜索提交+form默认提交事件
document.querySelector('form').addEventListener('submit', (event) => {
    if (!document.getElementById('search-box').value) {
        event.preventDefault();
    }
});