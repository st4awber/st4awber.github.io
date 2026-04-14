document.addEventListener('DOMContentLoaded', function() {
    // 尝试获取顶部区域的背景图（兼容内联样式和外部类样式）
    let bgUrl = null;
    const topSelectors = ['#page-top', '.page-top', '#top-bg', '.top-img'];
    for (let sel of topSelectors) {
        const el = document.querySelector(sel);
        if (el) {
            const bg = getComputedStyle(el).backgroundImage;
            if (bg && bg !== 'none') {
                const match = bg.match(/url\(["']?(.*?)["']?\)/);
                if (match) {
                    bgUrl = match[1];
                    break;
                }
            }
        }
    }
    // 降级：根据页面路径手动指定（可选，保证首页正确）
    if (!bgUrl) {
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            bgUrl = '/img/bg.avif';
        } else {
            bgUrl = '/img/bgdefault.avif';
        }
    }
    // 应用背景
    if (bgUrl) {
        document.body.style.backgroundImage = `url(${bgUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'scroll';
    }
});