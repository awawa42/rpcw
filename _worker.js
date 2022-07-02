export default {
    async fetch(request, env) {
        // You target urls here, qoute it one per line with a comma.
        // Note there should not a comma in the last line.
        // If urls more than one,will choose equally based on date.
        // Add a ":port" after hostname if you using a no standard SSL port.
        //要代理的网址，每行一个，放在单引号之间，半角逗号结尾。
        //注意最后一行不要加逗号。
        //多于一个会根据日期每天选一个代理。
        //非443端口网址后面加":端口号"。
        const targetUrls = [
            'https://www.google.com',
            'https://www.google.com:2222',
            'https://www.google.com:9997'
        ]

        //path to proxy, '/' will proxy the whole site。
        //代理路径，'/'代理全站。
        const proxyPath = '/'

        //如果代理路径没匹配，回落的网址
        const fallBackUrl = ''

        //choose target url based on date
        let targetUrl = ''
        let total = targetUrls.length
        if (total >= 1) {
            let day = new Date()
            let i = day.getDay() % total
            targetUrl = new URL(targetUrls[i])
        }

        //replace the request url's hostname and port
        let url = new URL(request.url)
        if (targetUrl != '' && url.pathname.indexOf(proxyPath) === 0) {
            return modReqUrl(url, targetUrl)
        } else if (fallBackUrl != '') {
            return modReqUrl(url, new URL(fallBackUrl))
        }

        function modReqUrl(url, targetUrl) {
            url.host = targetUrl.host
            url.port = targetUrl.port
            let new_request = new Request(url, request)
            return fetch(new_request)
        }
    },
}