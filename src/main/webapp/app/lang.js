calApp.config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '/lang/',
        suffix: '.json'
    });
    
    var langs = ['en', 'fr'];
    var fallback = langs[0];
    
    $translateProvider.determinePreferredLanguage(function() {
        var tag = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage;
        for(var i = 0; i<langs.length; i++){
            if(tag.indexOf(langs[i]) > -1){
                return langs[i];
            }
        }
        return fallback;
    });
});