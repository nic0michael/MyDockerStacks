OC.L10N.register(
    "provisioning_api",
    {
    "Logged in account must be an administrator or have authorization to edit this setting." : "登入的帳號必須為管理員或是有權編輯此設定的帳號。",
    "Could not create non-existing user ID" : "無法建立不存在的使用者 ID",
    "User already exists" : "使用者已存在",
    "Group %1$s does not exist" : "群組 %1$s 不存在",
    "Insufficient privileges for group %1$s" : "群組 %1$s 權限不足",
    "No group specified (required for sub-admins)" : "未指定群組（子管理員需要）",
    "Sub-admin group does not exist" : "子管理員群組不存在",
    "Cannot create sub-admins for admin group" : "無法為管理員群組建立子管理員",
    "No permissions to promote sub-admins" : "沒有新增子管理員的權限",
    "Invalid password value" : "無效的密碼值",
    "To send a password link to the user an email address is required." : "要寄出密碼連結給使用者之前需要設定一組 email 位址",
    "Required email address was not provided" : "未提供必要的電子郵件地址",
    "Invalid quota value: %1$s" : "無效的空間限額值：%1$s",
    "Invalid quota value. %1$s is exceeding the maximum quota" : "無效的空間限額值。%1$s 超過了最大空間限額",
    "Unlimited quota is forbidden on this instance" : "此站台禁止無限空間限額",
    "Setting the password is not supported by the users backend" : "使用者後端不支援設定密碼",
    "Invalid language" : "無效的語言",
    "Invalid locale" : "無效的地區設定",
    "Invalid first day of week" : "無效的一週第一天",
    "Cannot remove yourself from the admin group" : "無法將您自己從管理員群組移除",
    "Cannot remove yourself from this group as you are a sub-admin" : "因為您是子管理員，因此無法將自己從該群組中移除",
    "Not viable to remove user from the last group you are sub-admin of" : "無法從您作為子管理員的最後一個群組中移除使用者",
    "User does not exist" : "使用者不存在",
    "Group does not exist" : "群組不存在",
    "User is not a sub-admin of this group" : "使用者不是該群組的子管理員",
    "Email address not available" : "電子郵件地址不可用",
    "Sending email failed" : "傳送電子郵件失敗",
    "Email confirmation" : "電子郵件確認",
    "To enable the email address %s please click the button below." : "要啟用電子郵件地址 %s，請點擊下方按鈕。",
    "Confirm" : "確認",
    "Email was already removed from account and cannot be confirmed anymore." : "電子郵件已自帳號移除且無法再確認。",
    "Could not verify mail because the token is expired." : "無法驗證郵件，因為權杖已過期。",
    "Could not verify mail because the token is invalid." : "無法驗證郵件，因為權杖無效。",
    "An unexpected error occurred. Please contact your admin." : "遇到非預期的錯誤。請聯絡您的管理員。",
    "Email confirmation successful" : "電子郵件確認成功",
    "Provisioning API" : "Provisioning API",
    "This application enables a set of APIs that external systems can use to manage accounts, groups and apps." : "此應用程式啟用了一組 API，外部系統可以使用其來管理帳號、群組與應用程式。",
    "This application enables a set of APIs that external systems can use to create, edit, delete and query account\n\t\tattributes, query, set and remove groups, set quota and query total storage used in Nextcloud. Group admin accounts\n\t\tcan also query Nextcloud and perform the same functions as an admin for groups they manage. The API also enables\n\t\tan admin to query for active Nextcloud applications, application info, and to enable or disable an app remotely.\n\t\tOnce the app is enabled, HTTP requests can be used via a Basic Auth header to perform any of the functions\n\t\tlisted above. More information is available in the Provisioning API documentation, including example calls\n\t\tand server responses." : "此應用程式啟用了一組 API，外部系統可以使用其來建立、編輯、刪除與查詢帳號\n\t\t屬性，查詢、設定與移除群組，設定配額與查詢 Nextcloud 中使用的總儲存空間。群組管理員帳號\n\t\t也可以用其來查詢 Nextcloud，並在其管理的群組中執行與系統管理員相同的動作。這組 API 也讓\n\t\t管理員可以查詢作用中的 Nextcloud 應用程式、應用程式資訊，以及遠端啟用或停用應用程式。\n\t\t應用程式啟用後，可以使用基本驗證標頭來使用 HTTP 請求執行上面\n\t\t列出的任何功能。更多資訊在 Provisioning API 的文件中提供，包含範例呼叫\n\t\t與伺服器回應。",
    "Logged in user must be an administrator or have authorization to edit this setting." : "登入的使用者必須為管理員或是有權編輯此設定的使用者。",
    "This application enables a set of APIs that external systems can use to manage users, groups and apps." : "此應用程式啟用了一組 API，外部系統可以使用其來管理使用者、群組與應用程式。",
    "This application enables a set of APIs that external systems can use to create, edit, delete and query user\n\t\tattributes, query, set and remove groups, set quota and query total storage used in Nextcloud. Group admin users\n\t\tcan also query Nextcloud and perform the same functions as an admin for groups they manage. The API also enables\n\t\tan admin to query for active Nextcloud applications, application info, and to enable or disable an app remotely.\n\t\tOnce the app is enabled, HTTP requests can be used via a Basic Auth header to perform any of the functions\n\t\tlisted above. More information is available in the Provisioning API documentation, including example calls\n\t\tand server responses." : "此應用程式啟用了一組 API，外部系統可以使用其來建立、編輯、刪除與查詢使用者\n\t\t屬性，查詢、設定與移除群組，設定配額與查詢 Nextcloud 中使用的總儲存空間。群組管理員使用者\n\t\t也可以用其來查詢 Nextcloud，並在其管理的群組中執行與系統管理員相同的動作。這組 API 也讓\n\t\t管理員可以查詢作用中的 Nextcloud 應用程式、應用程式資訊，以及遠端啟用或停用應用程式。\n\t\t應用程式啟用後，可以使用基本驗證標頭來使用 HTTP 請求執行上面\n\t\t列出的任何功能。更多資訊在 Provisioning API 的文件中提供，包含範例呼叫\n\t\t與伺服器回應。"
},
"nplurals=1; plural=0;");