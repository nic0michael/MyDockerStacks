OC.L10N.register(
    "provisioning_api",
    {
    "Logged in account must be an administrator or have authorization to edit this setting." : "Oturum açmış hesap bir yönetici olmalı ya da bu ayarı düzenleme izni olmalıdır.",
    "Could not create non-existing user ID" : "Var olmayan kullanıcı kimliği oluşturulamadı",
    "User already exists" : "Kullanıcı zaten var",
    "Group %1$s does not exist" : "%1$s grubu bulunamadı",
    "Insufficient privileges for group %1$s" : "%1$s grubu için izinler yetersiz",
    "No group specified (required for sub-admins)" : "Herhangi bir grup belirtilmemiş (alt yöneticiler için gereklidir)",
    "Sub-admin group does not exist" : "Alt yönetici grubu bulunamadı",
    "Cannot create sub-admins for admin group" : "Yönetici grubu için alt yöneticiler oluşturulamadı",
    "No permissions to promote sub-admins" : "Alt yöneticileri yükseltme izni yok",
    "Invalid password value" : "Parola değeri geçersiz",
    "To send a password link to the user an email address is required." : "Kullanıcı e-posta adresi, parola bağlantısının gönderilebilmesi için gereklidir.",
    "Required email address was not provided" : "Gerekli e-posta adresi belirtilmemiş",
    "Invalid quota value: %1$s" : "Kota değeri geçersiz: %1$s",
    "Invalid quota value. %1$s is exceeding the maximum quota" : "Kota değeri geçersiz. %1$s en fazla kota değerini aşıyor",
    "Unlimited quota is forbidden on this instance" : "Bu kopyada sınırsız kota kullanılamaz",
    "Setting the password is not supported by the users backend" : "Kullanıcı arka yüzünden parola ayarlanamaz",
    "Invalid language" : "Dil geçersiz",
    "Invalid locale" : "Yerel ayar geçersiz",
    "Invalid first day of week" : "Haftanın ilk günü geçersiz",
    "Cannot remove yourself from the admin group" : "Kendinizi yönetici grubundan çıkaramazsınız",
    "Cannot remove yourself from this group as you are a sub-admin" : "Bir alt yönetici olduğunuzdan kendinizi bu gruptan çıkaramazsınız",
    "Not viable to remove user from the last group you are sub-admin of" : "Alt yöneticisi olduğunuz son gruptan kullanıcıyı kaldıramazsınız",
    "User does not exist" : "Kullanıcı bulunamadı",
    "Group does not exist" : "Grup bulunamadı",
    "User is not a sub-admin of this group" : "Kullanıcı bu grubun bir alt yöneticisi değil",
    "Email address not available" : "E-posta adresi kullanılamaz",
    "Sending email failed" : "E-posta gönderilemedi",
    "Email confirmation" : "E-posta doğrulaması",
    "To enable the email address %s please click the button below." : "%s e-posta adresini doğrulamak için aşağıdaki düğmeye tıklayın.",
    "Confirm" : "Onayla",
    "Email was already removed from account and cannot be confirmed anymore." : "E-posta hesaptan kaldırılmış olduğundan artık onaylanamaz.",
    "Could not verify mail because the token is expired." : "Kodun geçerlilik süresi dolmuş olduğundan e-posta doğrulanamadı.",
    "Could not verify mail because the token is invalid." : "Kod geçersiz olduğundan e-posta doğrulanamadı.",
    "An unexpected error occurred. Please contact your admin." : "Beklenmeyen bir sorun çıktı. Lütfen BT yöneticiniz ile görüşün.",
    "Email confirmation successful" : "E-posta onaylandı",
    "Provisioning API" : "Karşılama API",
    "This application enables a set of APIs that external systems can use to manage accounts, groups and apps." : "Bu uygulama, dış sistemlerin hesapları, grupları ve uygulamaları yönetmek için kullanabileceği bir dizi API uygulaması sağlar.",
    "This application enables a set of APIs that external systems can use to create, edit, delete and query account\n\t\tattributes, query, set and remove groups, set quota and query total storage used in Nextcloud. Group admin accounts\n\t\tcan also query Nextcloud and perform the same functions as an admin for groups they manage. The API also enables\n\t\tan admin to query for active Nextcloud applications, application info, and to enable or disable an app remotely.\n\t\tOnce the app is enabled, HTTP requests can be used via a Basic Auth header to perform any of the functions\n\t\tlisted above. More information is available in the Provisioning API documentation, including example calls\n\t\tand server responses." : "Bu uygulama, dış sistemlerin hesap özelliklerini eklemesi, düzenlemesi ve sorgulaması, grupları ayarlaması\n\t\tve silmesi ile Nextcloud tarafından kullanılan toplam depolama alanını sorgulaması için kullanabileceği\n\t\t bir dizi API uygulaması sağlar. Grup yöneticisi olan hesaplar da Nextcloud sorguları yürüterek yönettikleri\n\t\tgruplar üzerinde aynı işlemleri yöneticiler gibi yapabilirler. API uygulaması ayrıca etkin Nextcloud uygulamalarını\n\t\t ve uygulama bilgilerini sorgulayabilir ve uygulamaları uzaktan etkinleştirip, devre dışı bırakabilir. Uygulama\n\t\tetkinleştirildikten sonra yukarıdaki işlemleri yapmak için Temel Kimlik doğrulaması üst bilgisi ile HTTP istekleri\n\t\tkullanılabilir. Ayrıntılı bilgi almak ve örnek çağrılar ile sunucu yanıtlarını görmek için API hazırlama belgesine bakabilirsiniz.",
    "Logged in user must be an administrator or have authorization to edit this setting." : "Oturum açmış kullanıcı bir yönetici olmalı ya da bu ayarı düzenleme izni olmalıdır.",
    "This application enables a set of APIs that external systems can use to manage users, groups and apps." : "Bu uygulama, dış sistemlerin kullanıcıları, grupları ve uygulamaları yönetmek için kullanabileceği bir dizi API uygulaması sağlar.",
    "This application enables a set of APIs that external systems can use to create, edit, delete and query user\n\t\tattributes, query, set and remove groups, set quota and query total storage used in Nextcloud. Group admin users\n\t\tcan also query Nextcloud and perform the same functions as an admin for groups they manage. The API also enables\n\t\tan admin to query for active Nextcloud applications, application info, and to enable or disable an app remotely.\n\t\tOnce the app is enabled, HTTP requests can be used via a Basic Auth header to perform any of the functions\n\t\tlisted above. More information is available in the Provisioning API documentation, including example calls\n\t\tand server responses." : "Bu uygulama, dış sistemlerin kullanıcı özelliklerini eklemesi, düzenlemesi ve sorgulaması, grupları ayarlaması\n\t\tve silmesi ile Nextcloud tarafından kullanılan toplam depolama alanını sorgulaması için kullanabileceği\n\t\t bir dizi API uygulaması sağlar. Grup yöneticisi olan kullanıcılar da Nextcloud sorguları yürüterek yönettikleri\n\t\tgruplar üzerinde aynı işlemleri yöneticiler gibi yapabilirler. API uygulaması ayrıca etkin Nextcloud uygulamalarını\n\t\t ve uygulama bilgilerini sorgulayabilir ve uygulamaları uzaktan etkinleştirip, devre dışı bırakabilir. Uygulama\n\t\tetkinleştirildikten sonra yukarıdaki işlemleri yapmak için Temel Kimlik doğrulaması üst bilgisi ile HTTP istekleri\n\t\tkullanılabilir. Ayrıntılı bilgi almak ve örnek çağrılar ile sunucu yanıtlarını görmek için API hazırlama belgesine bakabilirsiniz."
},
"nplurals=2; plural=(n > 1);");