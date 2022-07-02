export default {
    async fetch(request, env) {
        // You target urls here, qoute it one per line with a comma
        // If urls more than one,will choose equally based on date
        // Add a ":port" after hostname if you using a no standard SSL port
        //要代理的网址，每行一个，放在单引号之间，半角逗号结尾
        //多于一个会根据日期每天选一个代理
        //非443端口网址后面加":端口号"
        const targetUrls = [
            'https://www.google.com',
            'https://www.google.com:2222',
            'https://www.google.com:9997',
        ]

        //choose target url based on date
        let targetUrl = ''
        let total = targetUrls.length
        if (total > 1) {
            let day = new Date()
            let i = day.getDay() % total
            targetUrl = targetUrls[i]
        } else if (total = 1) {
            targetUrl = targetUrls[0]
        }

        //replace the request url's hostname and port
        let url = new URL(request.url)
        if (targetUrl != '' && url.pathname.startsWith('/')) {
            url.host = targetUrl.host
            url.port = targetUrl.port
            let new_request = new Request(url, request)
            return fetch(new_request)
        }
        return env.ASSETS.fetch(request)
    },
}