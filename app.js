function chartApp() {
    return {
        tickerInput: '',
        chartList: [],
        favorites: [],
        activeTab: 'charts',

        // 초기화 함수
        init() {
            // 로컬 스토리지에서 즐겨찾기 불러오기
            const savedFavorites = localStorage.getItem('exChartFavorites');
            if (savedFavorites) {
                this.favorites = JSON.parse(savedFavorites);
            }
        },

        // 티커 입력 처리
        processTickerInput() {
            if (!this.tickerInput.trim()) {
                alert('티커를 입력해주세요.');
                return;
            }

            // 입력된 티커 분리 및 처리
            const tickers = this.tickerInput
                .split(/[\n,]/)  // 줄바꿈이나 쉼표로 분리
                .map(ticker => ticker.trim())
                .filter(ticker => ticker)  // 빈 문자열 제거
                .map(ticker => ticker.replace('/', ''));  // '/' 제거

            // 중복 제거
            this.chartList = [...new Set(tickers)];
            
            // 차트 탭으로 전환
            this.activeTab = 'charts';
        },

        // 티커 입력 지우기
        clearTickerInput() {
            this.tickerInput = '';
        },

        // 차트 URL 생성
        getChartUrl(ticker) {
            return `https://tryex.xyz/smart_chart.php?kind=${ticker}`;
        },

        // 주문 URL 생성 및 열기
        openOrderUrl(ticker) {
            // 티커 형식 변환 (BTCUSDT -> BTC-USDT)
            const formattedTicker = this.formatTickerForOrder(ticker);
            const orderUrl = `https://bingx.com/en/perpetual/${formattedTicker}`;
            window.open(orderUrl, '_blank');
        },

        // 티커 형식 변환 (BTCUSDT -> BTC-USDT)
        formatTickerForOrder(ticker) {
            // USDT로 끝나는 티커를 가정
            if (ticker.endsWith('USDT')) {
                const symbol = ticker.substring(0, ticker.length - 4);
                return `${symbol}-USDT`;
            }
            return ticker; // 기본값 반환
        },

        // 즐겨찾기 토글
        toggleFavorite(ticker) {
            if (this.isFavorite(ticker)) {
                this.removeFavorite(ticker);
            } else {
                this.addFavorite(ticker);
            }
        },

        // 즐겨찾기 추가
        addFavorite(ticker) {
            if (!this.favorites.includes(ticker)) {
                this.favorites.push(ticker);
                this.saveFavorites();
            }
        },

        // 즐겨찾기 제거
        removeFavorite(ticker) {
            this.favorites = this.favorites.filter(item => item !== ticker);
            this.saveFavorites();
        },

        // 즐겨찾기 여부 확인
        isFavorite(ticker) {
            return this.favorites.includes(ticker);
        },

        // 즐겨찾기 저장
        saveFavorites() {
            localStorage.setItem('exChartFavorites', JSON.stringify(this.favorites));
        }
    };
} 