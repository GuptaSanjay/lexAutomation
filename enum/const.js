'use strict';

const UserProfile = Object.freeze({
    'ADMIN': 'admin',
    'CSA': 'csa',
    'BIQ': 'BIQ',
    'HU_CHAMPION': 'HU_CHAMPION'
});

const SourceCountry = Object.freeze({
    'GBR': 'GBR',
    'USA': 'USA',
    'CAN': 'CAN',
    'IRL': 'IRL',
    'ITA': 'ITA',
    'FRA': 'FRA'
});

const Locale = Object.freeze({
    'GBR': 'en_GB',
    'USA': 'en_US',
    'CAN': 'en_CA',
    'ITA': 'it_IT',
    'IRL': 'en_IE',
    'FRA': 'fr_FR'
});

const LocaleName = Object.freeze({
    'GBR': 'English (United Kingdom)',
    'USA': 'English (United States)',
    'CAN': 'English (Canada)',
    'ITA': 'Italian (Italy)',
    'IRL': 'English (Ireland)',
    'FRA': 'French (France)'
});

const Currency = Object.freeze({
    'GBP': 'GBP',
    'USD': 'USD',
    'CAD': 'CAD',
    'EUR': 'EUR'
});

const Voucher = Object.freeze({
    'ONETIME_PERCENTAGE': 'ONETIME_PERCENTAGE',
    'RECURRING_PERCENTAGE': 'RECURRING_PERCENTAGE',
    'UNIVERSAL_PERCENTAGE': 'UNIVERSAL_PERCENTAGE',
    'ONETIME_FIXED': 'ONETIME_FIXED',
    'RECURRING_FIXED': 'RECURRING_FIXED',
    'UNIVERSAL_FIXED': 'UNIVERSAL_FIXED',
    '100_PERCENT': '100_PERCENT'
});

const Assertion = Object.freeze({
    'CONTAINS': 'CONTAINS',
    'IS_EQUAL': 'IS_EQUAL',
    'IS_NOT_EQUAL': 'IS_NOT_EQUAL',
    'IS_POPULATED': 'IS_POPULATED',
    'VALIDATE': 'VALIDATE',
    'INCREASED': 'INCREASED',
    'DECREASED': 'DECREASED',
    'IS_TRUE': 'IS_TRUE',
    'IS_FALSE': 'IS_FALSE',
});

const RatePlanPaymentType = Object.freeze({
    'ONETIME': 'ONETIME',
    'RECURRING': 'RECURRING',
    'BYO': 'BYO'
});

const PaymentMethod = Object.freeze({
    'CREDIT_CARD': 'CREDIT_CARD',
    'CREDIT_CARD_NEW': 'CREDIT_CARD_NEW',
    'CREDIT_CARD_AMEX': 'CREDIT_CARD_AMEX',
    'CREDIT_CARD_DISCOVERY': 'CREDIT_CARD_DISCOVERY',
    'DIRECT_DEBIT': 'DIRECT_DEBIT'
});

const DeliveryOption = Object.freeze({
    'DELIVERY': 'Delivery',
    'INSTALLATION': 'Installation'
});


module.exports = {
    UserProfile,
    SourceCountry,
    Locale,
    LocaleName,
    Currency,
    Voucher,
    Assertion,
    RatePlanPaymentType,
    PaymentMethod,
    DeliveryOption
};