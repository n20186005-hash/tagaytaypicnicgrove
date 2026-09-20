/**
 * Cloudflare Workers 入口（与静态资源 assets 一同部署）。
 * 只做三件事，不改变页面本身的静态托管方式：
 *
 * 1) HTTP → HTTPS 301 永久重定向
 *    GSC 数据里 http://tagaytaypicnicgrove.com/ 仍有曝光与点击，
 *    说明 HTTP 版本在参与排名、分散权重，需要 301 合并到 HTTPS 规范版本。
 *
 * 2) 静态资源缓存策略（移动端首屏 / Core Web Vitals）
 *    - 带内容哈希的构建产物（/_astro/）长缓存 + immutable；
 *    - HTML 不缓存，保证内容与结构化数据随时可更新；
 *    - 图片等其它资源短缓存。
 *
 * 3) 基础安全响应头（HSTS、nosniff、Referrer-Policy）
 *
 * 说明：若已在 Cloudflare 控制台开启 SSL/TLS → 边缘证书 → “Always Use HTTPS”，
 * 第 1 步会被边缘直接处理；保留此逻辑可保证自定义域名场景下也一定生效。
 */

const IMMUTABLE_PATH = /^\/(?:_astro|assets)\//;
const HTML_PATH = /(?:\/|\.html?)$/;

function isLocalhost(hostname) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1) HTTP → HTTPS 301（本地 wrangler dev 不重定向，避免调试不便）
    if (url.protocol === 'http:' && !isLocalhost(url.hostname)) {
      return Response.redirect(`https://${url.host}${url.pathname}${url.search}`, 301);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    // 2) 缓存策略
    if (IMMUTABLE_PATH.test(url.pathname)) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (HTML_PATH.test(url.pathname) || url.pathname === '/sw.js') {
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    } else {
      headers.set('Cache-Control', 'public, max-age=3600');
    }

    // 3) 安全响应头（仅在 HTTPS 下发送 HSTS）
    if (url.protocol === 'https:') {
      headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
