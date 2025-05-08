
//  1. كل الدول وربطها برموز العملات

const countryToCurrency = {
    'AF': 'AFN', 'AL': 'ALL', 'DZ': 'DZD', 'AD': 'EUR', 'AO': 'AOA',
    'AR': 'ARS', 'AM': 'AMD', 'AU': 'AUD', 'AT': 'EUR', 'AZ': 'AZN',
    'BH': 'BHD', 'BD': 'BDT', 'BY': 'BYN', 'BE': 'EUR', 'BJ': 'XOF',
    'BT': 'BTN', 'BO': 'BOB', 'BA': 'BAM', 'BW': 'BWP', 'BR': 'BRL',
    'BN': 'BND', 'BG': 'BGN', 'BF': 'XOF', 'BI': 'BIF', 'KH': 'KHR',
    'CM': 'XAF', 'CA': 'CAD', 'CV': 'CVE', 'CF': 'XAF', 'TD': 'XAF',
    'CL': 'CLP', 'CN': 'CNY', 'CO': 'COP', 'KM': 'KMF', 'CD': 'CDF',
    'CG': 'XAF', 'CR': 'CRC', 'CI': 'XOF', 'HR': 'EUR', 'CU': 'CUP',
    'CY': 'EUR', 'CZ': 'CZK', 'DK': 'DKK', 'DJ': 'DJF', 'DO': 'DOP',
    'EC': 'USD', 'EG': 'EGP', 'SV': 'USD', 'GQ': 'XAF', 'ER': 'ERN',
    'EE': 'EUR', 'ET': 'ETB', 'FJ': 'FJD', 'FI': 'EUR', 'FR': 'EUR',
    'GA': 'XAF', 'GM': 'GMD', 'GE': 'GEL', 'DE': 'EUR', 'GH': 'GHS',
    'GR': 'EUR', 'GT': 'GTQ', 'GN': 'GNF', 'GW': 'XOF', 'GY': 'GYD',
    'HT': 'HTG', 'HN': 'HNL', 'HU': 'HUF', 'IS': 'ISK', 'IN': 'INR',
    'ID': 'IDR', 'IR': 'IRR', 'IQ': 'IQD', 'IE': 'EUR', 'IL': 'ILS',
    'IT': 'EUR', 'JM': 'JMD', 'JP': 'JPY', 'JO': 'JOD', 'KZ': 'KZT',
    'KE': 'KES', 'KI': 'AUD', 'KP': 'KPW', 'KR': 'KRW', 'KW': 'KWD',
    'KG': 'KGS', 'LA': 'LAK', 'LV': 'EUR', 'LB': 'LBP', 'LS': 'LSL',
    'LR': 'LRD', 'LY': 'LYD', 'LI': 'CHF', 'LT': 'EUR', 'LU': 'EUR',
    'MG': 'MGA', 'MW': 'MWK', 'MY': 'MYR', 'MV': 'MVR', 'ML': 'XOF',
    'MT': 'EUR', 'MH': 'USD', 'MR': 'MRU', 'MU': 'MUR', 'MX': 'MXN',
    'FM': 'USD', 'MD': 'MDL', 'MC': 'EUR', 'MN': 'MNT', 'ME': 'EUR',
    'MA': 'MAD', 'MZ': 'MZN', 'MM': 'MMK', 'NA': 'NAD', 'NP': 'NPR',
    'NL': 'EUR', 'NZ': 'NZD', 'NI': 'NIO', 'NE': 'XOF', 'NG': 'NGN',
    'NO': 'NOK', 'OM': 'OMR', 'PK': 'PKR', 'PW': 'USD', 'PA': 'PAB',
    'PG': 'PGK', 'PY': 'PYG', 'PE': 'PEN', 'PH': 'PHP', 'PL': 'PLN',
    'PT': 'EUR', 'QA': 'QAR', 'RO': 'RON', 'RU': 'RUB', 'RW': 'RWF',
    'KN': 'XCD', 'LC': 'XCD', 'VC': 'XCD', 'WS': 'WST', 'SM': 'EUR',
    'ST': 'STN', 'SA': 'SAR', 'SN': 'XOF', 'RS': 'RSD', 'SC': 'SCR',
    'SL': 'SLL', 'SG': 'SGD', 'SK': 'EUR', 'SI': 'EUR', 'SB': 'SBD',
    'SO': 'SOS', 'ZA': 'ZAR', 'SS': 'SSP', 'ES': 'EUR', 'LK': 'LKR',
    'SD': 'SDG', 'SR': 'SRD', 'SE': 'SEK', 'CH': 'CHF', 'SY': 'SYP',
    'TW': 'TWD', 'TJ': 'TJS', 'TZ': 'TZS', 'TH': 'THB', 'TL': 'USD',
    'TG': 'XOF', 'TO': 'TOP', 'TT': 'TTD', 'TN': 'TND', 'TR': 'TRY',
    'TM': 'TMT', 'UG': 'UGX', 'UA': 'UAH', 'AE': 'AED', 'GB': 'GBP',
    'US': 'USD', 'UY': 'UYU', 'UZ': 'UZS', 'VU': 'VUV', 'VA': 'EUR',
    'VE': 'VES', 'VN': 'VND', 'YE': 'YER', 'ZM': 'ZMW', 'ZW': 'ZWL'
  };
  
  // 2. دالة بترجع العملات المفعّلة في المتجر من Salla.Config
  function getEnabledCurrencyCodes() {
    const currencies = Salla.Config.get('store.currencies') || [];
    return new Set(currencies.map(c => c.code));
  }
  
  // 3. تعيين العملة حسب الدولة، بشرط إنها تكون مفعّلة في المتجر
  function setCurrencyByCountryCode(code) {
    const enabledCurrencies = getEnabledCurrencyCodes();
    const currency = countryToCurrency[code];
  
    if (currency && enabledCurrencies.has(currency)) {
      Salla.Currency.set(currency);
    } else {
      // افتراضي: الريال السعودي
      Salla.Currency.set('SAR');
      console.warn('العملة غير مفعّلة أو غير معروفة، تم تعيين SAR كافتراضي:', currency);
    }
  }
  
  
  // 4. تحديد الدولة من خلال IP وتخزين العملة
  function detectAndSetCurrency() {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const countryCode = data.country;
        setCurrencyByCountryCode(countryCode);
        localStorage.setItem('salla:currency', countryCode);
      })
      .catch(err => {
        console.warn('IP lookup failed:', err);
      });
  }
  
  // 5. ننتظر مكتبة سلة تجهز قبل ما ننفذ أي حاجة
  const waitForSalla = setInterval(() => {
    if (window.Salla && Salla.Config && Salla.Currency) {
      clearInterval(waitForSalla);
      const storedCurrency = localStorage.getItem('salla:currency');
      if (!storedCurrency) {
        detectAndSetCurrency();
      } else {
        setCurrencyByCountryCode(storedCurrency);
      }
    }
  }, 300);
  