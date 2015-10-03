/*
 Configuration seed
*/
fun.conf = {
    // username account
    account: 'account',
    // dashboard context "organization"
    context: 'context',
    // html templates
    html: '/static/html',
    // internet domain
    domain: 'iofun.io',
    // seed url root
    urlRoot: '/api/',

    // system uuid's
    uuidRecord: 'record_uuid',
    uuidBilling: 'billing_uuid',
    uuidCampaign: 'campaign_uuid',
    uuidAlert: 'alert_uuid',
    uuidContact: 'contact_uuid',
    uuidNode: 'node_uuid',
    uuidCube: 'cube_uuid',
    uuidTask: 'task_uuid',
    uuidCompany: 'company_uuid',
    uuidDirectory: 'directory_uuid',
    uuidPricing: 'pricing_uuid',
    uuidSound: 'sound_uuid',
    uuidGateway: 'gateway_uuid',
    uuidAccount: 'account_uuid',
    uuidResource: 'resource_uuid',
    uuidMessage: 'message_uuid',

    lapse: 'lapse',

    startTime: 'start_time',
    endTime: 'end_time',

    first: 'first',
    last: 'last',

    next: 'next',
    previous: 'previous',

    pageNumber: 'page_number',
    pageSize: 'page_size',
    pageSmall: 8,
    pageMedium: 13,
    pageBig: 21
};

/*
 Configuration daemons
*/
fun.conf.daemons = {
    ws_server: 'ws://' + fun.conf.domain,
    ws_port: '10080',
    stun_port: '19302',
    turn_port: '3478',
    stun_server: 'stun.' + fun.conf.domain,
    turn_server: 'turn.' + fun.conf.domain,
    coturn_server: 'coturn.' + fun.conf.domain,
    sip_server: 'sip.' + fun.conf.domain
};

/*
 Common timeouts
*/
fun.conf.timeouts = {
    big: 60000,
    medium: 15000,
    small: 5000
};

/*
 Current SIP client configuration
*/
fun.conf.sip = {
    registrar_server: fun.conf.daemons.sip_server,
    ws_servers: fun.utils.format('%s%s', fun.conf.daemons.ws_server, fun.conf.daemons.ws_port),

    stun_servers: fun.utils.format('%s:%s', fun.conf.daemons.stun_server, fun.conf.daemons.stun_port),
    turn_servers: fun.utils.format('%s:%s', fun.conf.daemons.turn_server, fun.conf.daemons.turn_port),

    register: true,
    register_expires: '600',

    connection_recovery_min_interval: '3',
    connection_recovery_max_interval: '30',

    uri: fun.utils.format('sip:%s@%s', fun.conf.account, fun.conf.domain),
    password: '',

    display_name: 'Juan Monk',
    authorization_user: '',

    no_answer_timeout: '60',
    trace_sip: false,

    use_preloaded_route: false,

    hack_via_tcp: true,
    hacK_ip_in_contact: false
};

/*
 System urls
*/
fun.conf.urls = {
    upload: '/upload/',
    login: '/login/',
    logout: '/logout/',

    user: fun.utils.format('/users/%s', fun.conf.account),
    users: '/users/',

    userRegister: fun.utils.format('/users/%s/register/', fun.conf.account),

    org: fun.utils.format('/orgs/%s', fun.conf.account),
    orgs: '/orgs/',

    record: fun.utils.format('/records/%s', fun.conf.uuidRecord),
    records: '/records/',

    billing: fun.utils.format('/billings/%s', fun.conf.uuidBilling),
    billings: '/billings/',

    pricing: fun.utils.format('/pricings/%s', fun.conf.uuidPricing),
    pricings: '/pricings/',
    
    summary: '/records/summary/',
    summaries: '/records/summaries/',

    summaryStart: fun.utils.format('/records/summary/start/%s', fun.conf.startTime),
    summaryStartEnd: fun.utils.format('/records/summary/start/%s/end/%s', fun.conf.startTime, fun.conf.endTime),

    summariesStart: fun.utils.format('/records/summaries/start/%s', fun.conf.startTime),
    summariesStartEnd: fun.utils.format('/records/summaries/start/%s/end/%s', fun.conf.startTime, fun.conf.endTime),

    lapseSummary: fun.utils.format('/records/summary/%s', fun.conf.lapse),
    lapseSummaries: fun.utils.format('/records/summaries/%s', fun.conf.lapse),

    lapseSummaryStart: fun.utils.format('/records/summary/%s/start/%s', fun.conf.lapse, fun.conf.startTime),
    lapseSummaryStartEnd: fun.utils.format('/records/summary/%s/start/%s/end/%s', fun.conf.lapse, fun.conf.startTime, fun.conf.endTime),

    lapseSummariesStart: fun.utils.format('/records/summaries/%s/start/%s', fun.conf.lapse, fun.conf.startTime),
    lapseSummariesStartEnd: fun.utils.format('/records/summaries/%s/start/%s/end/%s', fun.conf.lapse, fun.conf.startTime, fun.conf.endTime),

    recordsStart: fun.utils.format('/records/start/%s', fun.conf.startTime),
    recordsStartEnd: fun.utils.format('/records/start/%s/end/%s', fun.conf.startTime, fun.conf.endTime),

    billingsRecord: fun.utils.format('/billings/records/%s', fun.conf.uuidRecord),
    billingsRecords: '/billings/records/',
    
    billingsStart: fun.utils.format('/billings/start/%s', fun.conf.startTime),
    billingsStartEnd: fun.utils.format('/billings/start/%s/end/%s', fun.conf.startTime, fun.conf.endTime),

    billingsRecordsStart: fun.utils.format('/billings/records/start/%s', fun.conf.startTime),
    billingsRecordsStartEnd: fun.utils.format('/billings/records/start/%s/end/%s', fun.conf.startTime, fun.conf.endTime),

    contact: fun.utils.format('/contacts/%s', fun.conf.uuidContact),
    contacts: '/contacts/',
    
    cube: fun.utils.format('/cubes/%s', fun.conf.uuidCube),
    cubes: '/cubes/',

    task: fun.utils.format('/tasks/%s', fun.conf.uuidTask),
    tasks: '/tasks/',

    resource: fun.utils.format('/resources/%s', fun.conf.uuidResource),
    resources: '/resources/',

    message: fun.utils.format('/messages/%s', fun.conf.uuidMessage),
    messages: '/messages/',

    company: fun.utils.format('/companies/%s', fun.conf.uuidCompany),
    companies: '/companies/',

    directory: fun.utils.format('/directories/%s', fun.conf.uuidDirectory),
    directories: '/directories/',

    campaign: fun.utils.format('/campaigns/%s', fun.conf.uuidCampaign),
    campaignsActive: '/campaigns/active/',
    campaigns: '/campaigns/',

    alert: fun.utils.format('/alerts/%s', fun.conf.uuidAlert),
    alerts: '/alerts/',

    gateway: fun.utils.format('/gateways/%s', fun.conf.uuidGateway),
    gateways: '/gateways/',

    message: fun.utils.format('/messages/%s', fun.conf.uuidMessage),
    messages: '/messages/',

    sounds: fun.utils.format('/sounds/'),

    recording: fun.utils.format('/recordings/%s', fun.conf.uuidRecording),
    recordings: '/recordings/',
};

/*
 HTML templates
*/
fun.conf.templates = {
    navbar: fun.utils.format('%s/navbar.html', fun.conf.html),
    
    navLanding: fun.utils.format('%s/navLanding.html', fun.conf.html),
    navDashboard: fun.utils.format('%s/navDashboard.html', fun.conf.html),
    
    navAdmin: fun.utils.format('%s/navAdmin.html', fun.conf.html), // ultimate junk!

    subheader: fun.utils.format('%s/subheader.html', fun.conf.html),
    headNav: fun.utils.format('%s/headNav.html', fun.conf.html),
    headNavCampaigns: fun.utils.format('%s/headNavCampaigns.html', fun.conf.html),
    headNavReports: fun.utils.format('%s/headNavReports.html', fun.conf.html),
    
    landing: fun.utils.format('%s/landing.html', fun.conf.html),
    
    features: fun.utils.format('%s/features.html', fun.conf.html),
    enterprise: fun.utils.format('%s/enterprise.html', fun.conf.html),
    pricing: fun.utils.format('%s/pricing.html', fun.conf.html),

    status: fun.utils.format('%s/status.html', fun.conf.html),
    
    tasks: fun.utils.format('%s/tasks.html', fun.conf.html),
    allTasks: fun.utils.format('%s/allTasks.html', fun.conf.html),
    taskRow: fun.utils.format('%s/taskRow.html', fun.conf.html),
    taskListItem: fun.utils.format('%s/taskListItem.html', fun.conf.html),
    tasksNowTab: fun.utils.format('%s/tasksNowTab.html', fun.conf.html),
    tasksLaterTab: fun.utils.format('%s/tasksLaterTab.html', fun.conf.html),
    tasksDoneTab: fun.utils.format('%s/tasksDoneTab.html', fun.conf.html),

    recordings: fun.utils.format('%s/recordings.html', fun.conf.html),
    recordingsAllTab: fun.utils.format('%s/recordingsAllTab.html', fun.conf.html),
    recordingsInboundTab: fun.utils.format('%s/recordingsInboundTab.html', fun.conf.html),
    recordingsOutboundTab: fun.utils.format('%s/recordingsOutboundTab.html', fun.conf.html),
    allRecordings: fun.utils.format('%s/allRecordings.html', fun.conf.html),
    recordingRow: fun.utils.format('%s/recordingRow.html', fun.conf.html),
    recordingListItem: fun.utils.format('%s/recordingListItem.html', fun.conf.html),

    gateways: fun.utils.format('%s/gateways.html', fun.conf.html),
    gatewaysAllTab: fun.utils.format('%s/gatewaysAllTab.html', fun.conf.html),
    gatewaysActiveTab: fun.utils.format('%s/gatewaysActiveTab.html', fun.conf.html),
    gatewaysMonitoredTab: fun.utils.format('%s/gatewaysMonitoredTab.html', fun.conf.html),
    gatewaysInboundTab: fun.utils.format('%s/gatewaysInboundTab.html', fun.conf.html),
    gatewaysOutboundTab: fun.utils.format('%s/gatewaysOutboundTab.html', fun.conf.html),

    allGateways: fun.utils.format('%s/allGateways.html', fun.conf.html),
    gatewayRow: fun.utils.format('%s/gatewayRow.html', fun.conf.html),
    gatewayListItem: fun.utils.format('%s/gatewayListItem.html', fun.conf.html),

    accounts: fun.utils.format('%s/accounts.html', fun.conf.html),
    accountsAllTab: fun.utils.format('%s/accountsAllTab.html', fun.conf.html),
    accountsActiveTab: fun.utils.format('%s/accountsActiveTab.html', fun.conf.html),
    accountsUsersTab: fun.utils.format('%s/accountsUsersTab.html', fun.conf.html),
    accountsOrganizationsTab: fun.utils.format('%s/accountsOrganizationsTab.html', fun.conf.html),
    accountsDisableTab: fun.utils.format('%s/accountsDisableTab.html', fun.conf.html),
    accountsSuspendedTab: fun.utils.format('%s/accountsSuspendedTab.html', fun.conf.html),

    accountRow: fun.utils.format('%s/accountRow.html', fun.conf.html),
    accountListItem: fun.utils.format('%s/accountListItem.html', fun.conf.html),

    resources: fun.utils.format('%s/resources.html', fun.conf.html),
    resourcesAllTab: fun.utils.format('%s/resourcesAllTab.html', fun.conf.html),
    resourcesImpsTab: fun.utils.format('%s/resourcesImpsTab.html', fun.conf.html),
    resourcesNodesTab: fun.utils.format('%s/resourcesNodesTab.html', fun.conf.html),

    resourceRow: fun.utils.format('%s/resourceRow.html', fun.conf.html),
    resourceListItem: fun.utils.format('%s/resourceListItem.html', fun.conf.html),

    companies: fun.utils.format('%s/companies.html', fun.conf.html),
    allCompanies: fun.utils.format('%s/allCompanies.html', fun.conf.html),
    companiesActiveTab: fun.utils.format('%s/companiesActiveTab.html', fun.conf.html),
    companiesDisableTab: fun.utils.format('%s/companiesDisableTab.html', fun.conf.html),

    companyRow: fun.utils.format('%s/companyRow.html', fun.conf.html),
    companyListItem: fun.utils.format('%s/companyListItem.html', fun.conf.html),

    help: fun.utils.format('%s/help.html', fun.conf.html),
    security: fun.utils.format('%s/security.html', fun.conf.html),
    terms: fun.utils.format('%s/terms.html', fun.conf.html),

    privacy: fun.utils.format('%s/privacy.html', fun.conf.html),
    
    signup: fun.utils.format('%s/signup.html', fun.conf.html),

    login: fun.utils.format('%s/login.html', fun.conf.html),
    
    dashboard: fun.utils.format('%s/dashboard.html', fun.conf.html),

    orgs: fun.utils.format('%s/orgs.html', fun.conf.html),
    
    campaigns: fun.utils.format('%s/campaigns.html', fun.conf.html),
    allCampaigns: fun.utils.format('%s/allCampaigns.html', fun.conf.html),
    campaignRow: fun.utils.format('%s/campaignRow.html', fun.conf.html),
    campaignsActiveTab: fun.utils.format('%s/campaignsActiveTab.html', fun.conf.html),
    campaignsPausedTab: fun.utils.format('%s/campaignsPausedTab.html', fun.conf.html),
    campaignsInboundTab: fun.utils.format('%s/campaignsInboundTab.html', fun.conf.html),
    campaignsOutboundTab: fun.utils.format('%s/campaignsOutboundTab.html', fun.conf.html),
    
    cubes: fun.utils.format('%s/cubes.html', fun.conf.html),
    allCubes: fun.utils.format('%s/allCubes.html', fun.conf.html),
    cubeRow: fun.utils.format('%s/cubeRow.html', fun.conf.html),
   
    accountListItem: fun.utils.format('%s/accountListItem.html', fun.conf.html),
    
    campaignListItem: fun.utils.format('%s/campaignListItem.html', fun.conf.html),
    
    cubeListItem: fun.utils.format('%s/cubeListItem.html', fun.conf.html),
    
    recordRow: fun.utils.format('%s/recordRow.html', fun.conf.html),
    typeRow: fun.utils.format('%s/typeRow.html', fun.conf.html),
    sumRow: fun.utils.format('%s/sumRow.html', fun.conf.html),

    lastRecord: fun.utils.format('%s/lastRecord.html', fun.conf.html),
    latestRecords: fun.utils.format('%s/latestRecords.html', fun.conf.html),

    recordType: fun.utils.format('%s/recordType.html', fun.conf.html),
    recordSummary: fun.utils.format('%s/recordSummary.html', fun.conf.html),

    todaySummary: fun.utils.format('%s/todaySummary.html', fun.conf.html),
    todayActivityChart: fun.utils.format('%s/todayActivityChart.html', fun.conf.html),

    dialpad: fun.utils.format('%s/dialpad.html', fun.conf.html),
    
    messages: fun.utils.format('%s/messages.html', fun.conf.html),
    messagesRow: fun.utils.format('%s/messagesRow.html', fun.conf.html),
    messagesAllTab: fun.utils.format('%s/messagesAllTab.html', fun.conf.html),
    messagesUnreadTab: fun.utils.format('%s/messagesUnreadTab.html', fun.conf.html),
    messagesNotificationsTab: fun.utils.format('%s/messagesNotificationsTab.html', fun.conf.html),
    messagesAlertsTab: fun.utils.format('%s/messagesAlertsTab.html', fun.conf.html),

    videos: fun.utils.format('%s/videos.html', fun.conf.html),

    controlTo: fun.utils.format('%s/controlTo.html', fun.conf.html),
    controlFrom: fun.utils.format('%s/controlFrom.html', fun.conf.html),
    findLapse: fun.utils.format('%s/findLapse.html', fun.conf.html),
    
    message: fun.utils.format('%s/message.html', fun.conf.html),
    messageSmall: fun.utils.format('%s/messageSmall.html', fun.conf.html),
    messageMedium: fun.utils.format('%s/messageMedium', fun.conf.html),
    messageLarge: fun.utils.format('%s/messageLarge', fun.conf.html),

    warning: fun.utils.format('%s/warning.html', fun.conf.html),
    warningSmall: fun.utils.format('%s/warningSmall.html', fun.conf.html),
    warningMedium: fun.utils.format('%s/warningMedium.html', fun.conf.html),
    warningLarge: fun.utils.format('%s/warningLarge.html', fun.conf.html),

    error: fun.utils.format('%s/error.html', fun.conf.html),
    errorSmall: fun.utils.format('%s/errorSmall.html', fun.conf.html),
    errorMedium: fun.utils.format('%s/errorMedium.html', fun.conf.html),
    errorLarge: fun.utils.format('%s/errorLarge.html', fun.conf.html),

    phone: fun.utils.format('%s/phone.html', fun.conf.html),

    profile: fun.utils.format('%s/profile.html', fun.conf.html),

    activity: fun.utils.format('%s/activity.html', fun.conf.html),
    
    members: fun.utils.format('%s/members.html', fun.conf.html),
    memberRow: fun.utils.format('%s/memberRow.html', fun.conf.html),

    teams: fun.utils.format('%s/teams.html', fun.conf.html),
    teamRow: fun.utils.format('%s/teamRow.html', fun.conf.html),

    contacts: fun.utils.format('%s/contacts.html', fun.conf.html),
    allContacts: fun.utils.format('%s/allContacts.html', fun.conf.html),

    directoryList: fun.utils.format('%s/directoryList.html', fun.conf.html),
    contactRow: fun.utils.format('%s/contactRow.html', fun.conf.html),
    directoryRow: fun.utils.format('%s/directoryRow.html', fun.conf.html),
    sounds: fun.utils.format('%s/sounds.html', fun.conf.html),
    
    reports: fun.utils.format('%s/reports.html', fun.conf.html),
    settings: fun.utils.format('%s/settings.html', fun.conf.html),

    extra: fun.utils.format('%s/extra.html', fun.conf.html),
    extraNavbar: fun.utils.format('%s/extraNavbar.html', fun.conf.html),
    extraNavLanding: fun.utils.format('%s/extraNavLanding.html', fun.conf.html),
    extraNavDashboard: fun.utils.format('%s/extraNavDashboard.html', fun.conf.html),
    
    social: fun.utils.format('%s/social.html', fun.conf.html),
    subscribe: fun.utils.format('%s/subscribe.html', fun.conf.html),

    footer: fun.utils.format('%s/footer.html', fun.conf.html)
};

/*
 Hash tags for backbone.js router
*/
fun.conf.hash = {
    home: '#home',
    landing: '#landing',
    features: '#features',
    enterprise: '#enterprise',
    pricing: '#pricing',
    terms: '#terms',
    privacy: '#privacy',
    security: '#security',
    status: '#status',
    help: '#help',
    signup: '#signup',
    login: '#login',
    gateways: '#gateways',
    accounts: '#accounts',
    messages: '#messages',
    resources: '#resources',
    dashboard : '#dashboard',
    dashboardWithAccount: '#dashboard/a{account}',
    profile: '#profile',
    profileWithAccount: '#profile/a{account}',
    activity: '#activity',
    orgs: '#orgs',
    campaigns: '#campaigns',
    nodes: '#nodes',
    members: '#members',
    teams: '#teams',
    phone: '#phone',
    reports: '#reports',
    reportsWithPage: '#reports/p{page}',
    contacts: '#contacts',
    cubes: '#cubes',
    contactsWithPage: '#contacts/p{page}',
    tasks: '#tasks',
    companies: '#companies',
    sounds: '#sounds',
    recordings: '#recordings',
    settings: '#settings'
};
