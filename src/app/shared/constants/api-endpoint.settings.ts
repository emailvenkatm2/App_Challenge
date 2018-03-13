/*
Global Constants which can be shared across all the compponents
*/
export class APIConstants {
public static CHAT_API_BASE_URL = 'https://walmartlabs-test.appspot.com/_ah/api/walmart/v1';
public static CHAT_API_KEY = '9a9ba8a6-ba9a-4083-9582-9ea5f8c4a0f8';
public static CHAT_API_GET_PRODUCT_LIST_PATH = '/walmartproducts/';
public static CHAT_API_RESPONSE_PREFIX_TEXT = 'Here are the products you are looking for:';
public static CHAT_API_DEFAULT_PAGE_NUMBER = 1;
public static CHAT_API_DEFAULT_ITEM_COUNT = 5;
//Id 0 for sender, 1 for user. Faking these values as we don't have authentication/authorization
public static CHAT_API_DEFAULT_SENDER = '0'; 
public static CHAT_API_DEFAULT_USER = '1';
public static CHAT_API_DEFAULT_SUCCESS_MESSAGE_TYPE = 'info';
public static CHAT_API_DEFAULT_FAILURE_MESSAGE_TYPE = 'error';
}
