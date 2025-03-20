// background.js

// 使用 storage API 持久化保存状态
function checkAndCreateTab() {
  chrome.storage.local.get('hasCreated', (result) => {
    if (!result.hasCreated) {
      // 创建新标签页
      chrome.tabs.create({ url: "index.html" }, (tab) => {
        // 确保标签页创建成功后再更新状态
        if (tab && !tab.error) {
          chrome.storage.local.set({ hasCreated: true });
        }
      });
    }
  });
}

// 监听所有标签页创建事件
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.url === 'chrome://newtab/') {
    chrome.tabs.remove(tab.id);
  }
});

// 浏览器启动时执行
chrome.runtime.onStartup.addListener(() => {
  // 查询所有已打开的 index.html 标签页
  chrome.tabs.query({ url: "index.html" }, (tabs) => {
    if (tabs.length > 0) {
      // 如果存在多个标签页，关闭所有标签页
      tabs.forEach(tab => chrome.tabs.remove(tab.id));
    }

    // 确保只创建一个实例
    checkAndCreateTab();
  });
});

// 当最后一个 index.html 标签页关闭时，重置状态
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  chrome.tabs.query({ url: "index.html" }, (tabs) => {
    if (tabs.length === 0) {
      chrome.storage.local.set({ hasCreated: false });
    }
  });
});

// 初始化时检查是否需要创建标签页
chrome.runtime.onInstalled.addListener(() => {
  checkAndCreateTab();
});