// Country code to flag emoji map (ISO 3166-1 alpha-2)
const countryCodeToFlag = {
  // A
  'AD': '🇦🇩', // Andorra
  'AE': '🇦🇪', // United Arab Emirates
  'AF': '🇦🇫', // Afghanistan
  'AG': '🇦🇬', // Antigua and Barbuda
  'AI': '🇦🇮', // Anguilla
  'AL': '🇦🇱', // Albania
  'AM': '🇦🇲', // Armenia
  'AO': '🇦🇴', // Angola
  'AQ': '🇦🇶', // Antarctica
  'AR': '🇦🇷', // Argentina
  'AS': '🇦🇸', // American Samoa
  'AT': '🇦🇹', // Austria
  'AU': '🇦🇺', // Australia
  'AW': '🇦🇼', // Aruba
  'AX': '🇦🇽', // Åland Islands
  'AZ': '🇦🇿', // Azerbaijan

  // B
  'BA': '🇧🇦', // Bosnia and Herzegovina
  'BB': '🇧🇧', // Barbados
  'BD': '🇧🇩', // Bangladesh
  'BE': '🇧🇪', // Belgium
  'BF': '🇧🇫', // Burkina Faso
  'BG': '🇧🇬', // Bulgaria
  'BH': '🇧🇭', // Bahrain
  'BI': '🇧🇮', // Burundi
  'BJ': '🇧🇯', // Benin
  'BL': '🇧🇱', // Saint Barthélemy
  'BM': '🇧🇲', // Bermuda
  'BN': '🇧🇳', // Brunei
  'BO': '🇧🇴', // Bolivia
  'BQ': '🇧🇶', // Caribbean Netherlands
  'BR': '🇧🇷', // Brazil
  'BS': '🇧🇸', // Bahamas
  'BT': '🇧🇹', // Bhutan
  'BV': '🇧🇻', // Bouvet Island
  'BW': '🇧🇼', // Botswana
  'BY': '🇧🇾', // Belarus
  'BZ': '🇧🇿', // Belize

  // C
  'CA': '🇨🇦', // Canada
  'CC': '🇨🇨', // Cocos Islands
  'CD': '🇨🇩', // Democratic Republic of the Congo
  'CF': '🇨🇫', // Central African Republic
  'CG': '🇨🇬', // Republic of the Congo
  'CH': '🇨🇭', // Switzerland
  'CI': '🇨🇮', // Côte d'Ivoire
  'CK': '🇨🇰', // Cook Islands
  'CL': '🇨🇱', // Chile
  'CM': '🇨🇲', // Cameroon
  'CN': '🇨🇳', // China
  'CO': '🇨🇴', // Colombia
  'CR': '🇨🇷', // Costa Rica
  'CU': '🇨🇺', // Cuba
  'CV': '🇨🇻', // Cape Verde
  'CW': '🇨🇼', // Curaçao
  'CX': '🇨🇽', // Christmas Island
  'CY': '🇨🇾', // Cyprus
  'CZ': '🇨🇿', // Czech Republic

  // D
  'DE': '🇩🇪', // Germany
  'DJ': '🇩🇯', // Djibouti
  'DK': '🇩🇰', // Denmark
  'DM': '🇩🇲', // Dominica
  'DO': '🇩🇴', // Dominican Republic
  'DZ': '🇩🇿', // Algeria

  // E
  'EC': '🇪🇨', // Ecuador
  'EE': '🇪🇪', // Estonia
  'EG': '🇪🇬', // Egypt
  'EH': '🇪🇭', // Western Sahara
  'ER': '🇪🇷', // Eritrea
  'ES': '🇪🇸', // Spain
  'ET': '🇪🇹', // Ethiopia
  'EU': '🇪🇺', // European Union
  'FI': '🇫🇮', // Finland
  'FJ': '🇫🇯', // Fiji
  'FK': '🇫🇰', // Falkland Islands
  'FM': '🇫🇲', // Micronesia
  'FO': '🇫🇴', // Faroe Islands
  'FR': '🇫🇷', // France

  // G
  'GA': '🇬🇦', // Gabon
  'GB': '🇬🇧', // United Kingdom
  'GD': '🇬🇩', // Grenada
  'GE': '🇬🇪', // Georgia
  'GF': '🇬🇫', // French Guiana
  'GG': '🇬🇬', // Guernsey
  'GH': '🇬🇭', // Ghana
  'GI': '🇬🇮', // Gibraltar
  'GL': '🇬🇱', // Greenland
  'GM': '🇬🇲', // Gambia
  'GN': '🇬🇳', // Guinea
  'GP': '🇬🇵', // Guadeloupe
  'GQ': '🇬🇶', // Equatorial Guinea
  'GR': '🇬🇷', // Greece
  'GS': '🇬🇸', // South Georgia and the South Sandwich Islands
  'GT': '🇬🇹', // Guatemala
  'GU': '🇬🇺', // Guam
  'GW': '🇬🇼', // Guinea-Bissau
  'GY': '🇬🇾', // Guyana

  // H
  'HK': '🇭🇰', // Hong Kong
  'HM': '🇭🇲', // Heard Island and McDonald Islands
  'HN': '🇭🇳', // Honduras
  'HR': '🇭🇷', // Croatia
  'HT': '🇭🇹', // Haiti
  'HU': '🇭🇺', // Hungary

  // I
  'ID': '🇮🇩', // Indonesia
  'IE': '🇮🇪', // Ireland
  'IL': '🇮🇱', // Israel
  'IM': '🇮🇲', // Isle of Man
  'IN': '🇮🇳', // India
  'IO': '🇮🇴', // British Indian Ocean Territory
  'IQ': '🇮🇶', // Iraq
  'IR': '🇮🇷', // Iran
  'IS': '🇮🇸', // Iceland
  'IT': '🇮🇹', // Italy

  // J
  'JE': '🇯🇪', // Jersey
  'JM': '🇯🇲', // Jamaica
  'JO': '🇯🇴', // Jordan
  'JP': '🇯🇵', // Japan

  // K
  'KE': '🇰🇪', // Kenya
  'KG': '🇰🇬', // Kyrgyzstan
  'KH': '🇰🇭', // Cambodia
  'KI': '🇰🇮', // Kiribati
  'KM': '🇰🇲', // Comoros
  'KN': '🇰🇳', // Saint Kitts and Nevis
  'KP': '🇰🇵', // North Korea
  'KR': '🇰🇷', // South Korea
  'KW': '🇰🇼', // Kuwait
  'KY': '🇰🇾', // Cayman Islands
  'KZ': '🇰🇿', // Kazakhstan

  // L
  'LA': '🇱🇦', // Laos
  'LB': '🇱🇧', // Lebanon
  'LC': '🇱🇨', // Saint Lucia
  'LI': '🇱🇮', // Liechtenstein
  'LK': '🇱🇰', // Sri Lanka
  'LR': '🇱🇷', // Liberia
  'LS': '🇱🇸', // Lesotho
  'LT': '🇱🇹', // Lithuania
  'LU': '🇱🇺', // Luxembourg
  'LV': '🇱🇻', // Latvia
  'LY': '🇱🇾', // Libya

  // M
  'MA': '🇲🇦', // Morocco
  'MC': '🇲🇨', // Monaco
  'MD': '🇲🇩', // Moldova
  'ME': '🇲🇪', // Montenegro
  'MF': '🇲🇫', // Saint Martin
  'MG': '🇲🇬', // Madagascar
  'MH': '🇲🇭', // Marshall Islands
  'MK': '🇲🇰', // North Macedonia
  'ML': '🇲🇱', // Mali
  'MM': '🇲🇲', // Myanmar
  'MN': '🇲🇳', // Mongolia
  'MO': '🇲🇴', // Macao
  'MP': '🇲🇵', // Northern Mariana Islands
  'MQ': '🇲🇶', // Martinique
  'MR': '🇲🇷', // Mauritania
  'MS': '🇲🇸', // Montserrat
  'MT': '🇲🇹', // Malta
  'MU': '🇲🇺', // Mauritius
  'MV': '🇲🇻', // Maldives
  'MW': '🇲🇼', // Malawi
  'MX': '🇲🇽', // Mexico
  'MY': '🇲🇾', // Malaysia
  'MZ': '🇲🇿', // Mozambique

  // N
  'NA': '🇳🇦', // Namibia
  'NC': '🇳🇨', // New Caledonia
  'NE': '🇳🇪', // Niger
  'NF': '🇳🇫', // Norfolk Island
  'NG': '🇳🇬', // Nigeria
  'NI': '🇳🇮', // Nicaragua
  'NL': '🇳🇱', // Netherlands
  'NO': '🇳🇴', // Norway
  'NP': '🇳🇵', // Nepal
  'NR': '🇳🇷', // Nauru
  'NU': '🇳🇺', // Niue
  'NZ': '🇳🇿', // New Zealand

  // O
  'OM': '🇴🇲', // Oman

  // P
  'PA': '🇵🇦', // Panama
  'PE': '🇵🇪', // Peru
  'PF': '🇵🇫', // French Polynesia
  'PG': '🇵🇬', // Papua New Guinea
  'PH': '🇵🇭', // Philippines
  'PK': '🇵🇰', // Pakistan
  'PL': '🇵🇱', // Poland
  'PM': '🇵🇲', // Saint Pierre and Miquelon
  'PN': '🇵🇳', // Pitcairn
  'PR': '🇵🇷', // Puerto Rico
  'PS': '🇵🇸', // Palestine
  'PT': '🇵🇹', // Portugal
  'PW': '🇵🇼', // Palau
  'PY': '🇵🇾', // Paraguay

  // Q
  'QA': '🇶🇦', // Qatar

  // R
  'RE': '🇷🇪', // Réunion
  'RO': '🇷🇴', // Romania
  'RS': '🇷🇸', // Serbia
  'RU': '🇷🇺', // Russia
  'RW': '🇷🇼', // Rwanda

  // S
  'SA': '🇸🇦', // Saudi Arabia
  'SB': '🇸🇧', // Solomon Islands
  'SC': '🇸🇨', // Seychelles
  'SD': '🇸🇩', // Sudan
  'SE': '🇸🇪', // Sweden
  'SG': '🇸🇬', // Singapore
  'SH': '🇸🇭', // Saint Helena
  'SI': '🇸🇮', // Slovenia
  'SJ': '🇸🇯', // Svalbard and Jan Mayen
  'SK': '🇸🇰', // Slovakia
  'SL': '🇸🇱', // Sierra Leone
  'SM': '🇸🇲', // San Marino
  'SN': '🇸🇳', // Senegal
  'SO': '🇸🇴', // Somalia
  'SR': '🇸🇷', // Suriname
  'SS': '🇸🇸', // South Sudan
  'ST': '🇸🇹', // São Tomé and Príncipe
  'SV': '🇸🇻', // El Salvador
  'SX': '🇸🇽', // Sint Maarten
  'SY': '🇸🇾', // Syria
  'SZ': '🇸🇿', // Eswatini

  // T
  'TC': '🇹🇨', // Turks and Caicos Islands
  'TD': '🇹🇩', // Chad
  'TF': '🇹🇫', // French Southern Territories
  'TG': '🇹🇬', // Togo
  'TH': '🇹🇭', // Thailand
  'TJ': '🇹🇯', // Tajikistan
  'TK': '🇹🇰', // Tokelau
  'TL': '🇹🇱', // Timor-Leste
  'TM': '🇹🇲', // Turkmenistan
  'TN': '🇹🇳', // Tunisia
  'TO': '🇹🇴', // Tonga
  'TR': '🇹🇷', // Turkey
  'TT': '🇹🇹', // Trinidad and Tobago
  'TV': '🇹🇻', // Tuvalu
  'TW': '🇹🇼', // Taiwan
  'TZ': '🇹🇿', // Tanzania

  // U
  'UA': '🇺🇦', // Ukraine
  'UG': '🇺🇬', // Uganda
  'UM': '🇺🇲', // United States Minor Outlying Islands
  'US': '🇺🇸', // United States
  'UY': '🇺🇾', // Uruguay
  'UZ': '🇺🇿', // Uzbekistan

  // V
  'VA': '🇻🇦', // Vatican City
  'VC': '🇻🇨', // Saint Vincent and the Grenadines
  'VE': '🇻🇪', // Venezuela
  'VG': '🇻🇬', // British Virgin Islands
  'VI': '🇻🇮', // U.S. Virgin Islands
  'VN': '🇻🇳', // Vietnam
  'VU': '🇻🇺', // Vanuatu

  // W
  'WF': '🇼🇫', // Wallis and Futuna
  'WS': '🇼🇸', // Samoa

  // X, Y, Z
  'XK': '🇽🇰', // Kosovo
  'YE': '🇾🇪', // Yemen
  'YT': '🇾🇹', // Mayotte
  'ZA': '🇿🇦', // South Africa
  'ZM': '🇿🇲', // Zambia
  'ZW': '🇿🇼', // Zimbabwe
};

// Country name to flag emoji map (for common country names)
const countryNameToFlag = {
  // A
  'Afghanistan': '🇦🇫',
  'Albania': '🇦🇱',
  'Algeria': '🇩🇿',
  'Argentina': '🇦🇷',
  'Armenia': '🇦🇲',
  'Australia': '🇦🇺',
  'Austria': '🇦🇹',
  'Azerbaijan': '🇦🇿',

  // B
  'Bahrain': '🇧🇭',
  'Bangladesh': '🇧🇩',
  'Belgium': '🇧🇪',
  'Bolivia': '🇧🇴',
  'Bosnia and Herzegovina': '🇧🇦',
  'Brazil': '🇧🇷',
  'Bulgaria': '🇧🇬',
  'Burma': '🇲🇲', // Myanmar

  // C
  'Cambodia': '🇰🇭',
  'Canada': '🇨🇦',
  'Chile': '🇨🇱',
  'China': '🇨🇳',
  'Colombia': '🇨🇴',
  'Costa Rica': '🇨🇷',
  'Croatia': '🇭🇷',
  'Cuba': '🇨🇺',
  'Cyprus': '🇨🇾',
  'Czech Republic': '🇨🇿',
  'Czechia': '🇨🇿',

  // D
  'Denmark': '🇩🇰',
  'Dominican Republic': '🇩🇴',

  // E
  'Ecuador': '🇪🇨',
  'Egypt': '🇪🇬',
  'Estonia': '🇪🇪',
  'Ethiopia': '🇪🇹',

  // F
  'Finland': '🇫🇮',
  'France': '🇫🇷',

  // G
  'Georgia': '🇬🇪',
  'Germany': '🇩🇪',
  'Ghana': '🇬🇭',
  'Greece': '🇬🇷',
  'Guatemala': '🇬🇹',

  // H
  'Honduras': '🇭🇳',
  'Hong Kong': '🇭🇰',
  'Hungary': '🇭🇺',

  // I
  'Iceland': '🇮🇸',
  'India': '🇮🇳',
  'Indonesia': '🇮🇩',
  'Iran': '🇮🇷',
  'Iraq': '🇮🇶',
  'Ireland': '🇮🇪',
  'Israel': '🇮🇱',
  'Italy': '🇮🇹',

  // J
  'Jamaica': '🇯🇲',
  'Japan': '🇯🇵',
  'Jordan': '🇯🇴',

  // K
  'Kazakhstan': '🇰🇿',
  'Kenya': '🇰🇪',
  'Kosovo': '🇽🇰',
  'Kuwait': '🇰🇼',
  'Kyrgyzstan': '🇰🇬',

  // L
  'Latvia': '🇱🇻',
  'Lebanon': '🇱🇧',
  'Libya': '🇱🇾',
  'Lithuania': '🇱🇹',
  'Luxembourg': '🇱🇺',

  // M
  'Malaysia': '🇲🇾',
  'Mexico': '🇲🇽',
  'Moldova': '🇲🇩',
  'Monaco': '🇲🇨',
  'Mongolia': '🇲🇳',
  'Montenegro': '🇲🇪',
  'Morocco': '🇲🇦',
  'Myanmar': '🇲🇲',

  // N
  'Nepal': '🇳🇵',
  'Netherlands': '🇳🇱',
  'New Zealand': '🇳🇿',
  'Nicaragua': '🇳🇮',
  'Nigeria': '🇳🇬',
  'North Korea': '🇰🇵',
  'North Macedonia': '🇲🇰',
  'Norway': '🇳🇴',

  // O
  'Oman': '🇴🇲',

  // P
  'Pakistan': '🇵🇰',
  'Palestine': '🇵🇸',
  'Panama': '🇵🇦',
  'Paraguay': '🇵🇾',
  'Peru': '🇵🇪',
  'Philippines': '🇵🇭',
  'Poland': '🇵🇱',
  'Portugal': '🇵🇹',

  // Q
  'Qatar': '🇶🇦',

  // R
  'Romania': '🇷🇴',
  'Russia': '🇷🇺',
  'Russian Federation': '🇷🇺',

  // S
  'Saudi Arabia': '🇸🇦',
  'Serbia': '🇷🇸',
  'Singapore': '🇸🇬',
  'Slovakia': '🇸🇰',
  'Slovenia': '🇸🇮',
  'South Africa': '🇿🇦',
  'South Korea': '🇰🇷',
  'Spain': '🇪🇸',
  'Sri Lanka': '🇱🇰',
  'Sweden': '🇸🇪',
  'Switzerland': '🇨🇭',
  'Syria': '🇸🇾',

  // T
  'Taiwan': '🇹🇼',
  'Thailand': '🇹🇭',
  'Turkey': '🇹🇷',

  // U
  'Ukraine': '🇺🇦',
  'United Arab Emirates': '🇦🇪',
  'United Kingdom': '🇬🇧',
  'United States': '🇺🇸',
  'Uruguay': '🇺🇾',
  'Uzbekistan': '🇺🇿',

  // V
  'Venezuela': '🇻🇪',
  'Vietnam': '🇻🇳',

  // Y
  'Yemen': '🇾🇪',

  // Z
  'Zimbabwe': '🇿🇼'
};

export function getCountryFlag(country) {
  if (!country) return '🏳️';
  const identifier = country.toString().trim();
  return countryNameToFlag[identifier] || '🏳️';
}

export function getCountryCodeFlag(countryCode) {
  if (!countryCode) return '🏳️';
  const identifier = countryCode.toString().trim();
  return countryCodeToFlag[identifier] || '🏳️';
}

