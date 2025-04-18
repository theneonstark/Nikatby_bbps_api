<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\CommissionController;
use App\Http\Controllers\Controllers\Auth\AuthanticationController;
use App\Http\Controllers\Controllers\Controllers\Auth\AuthanticationController as AuthAuthanticationController;
use App\Http\Controllers\LicController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\Paysprint\BusTicketController;
use App\Http\Controllers\Paysprint\DashboardController;
use App\Http\Controllers\Paysprint\DMT2Controller;
use App\Http\Controllers\Paysprint\FastagRechargeController;
use App\Http\Controllers\Paysprint\InsurancePremiumPaymentController;
use App\Http\Controllers\Paysprint\LPGController;
use App\Http\Controllers\Paysprint\MunicipalityController;
use App\Http\Controllers\Paysprint\RechargeController;
use App\Http\Controllers\Paysprint\Remitter2Controller;
use App\Http\Controllers\Paysprint\UtilitybillPaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard',[
            'user' => isset(auth()->user()->name) ? auth()->user()->name: ' '
        ]);
    });
    Route::get('/services', function () {
        return Inertia::render('Services');
    });
    Route::get('/billPay', function () {
        return Inertia::render('Billpay');
    });
    Route::get('/page', function () {
        return Inertia::render('Formpage');
    });
    Route::get('/billFetch', function () {
        return Inertia::render('Billfetch');
    });
    Route::get('/billSuccess', function () {
        return Inertia::render('Billsuccess');
    });
    Route::get('/complaint', function () {
        return Inertia::render('Complaint');
    });
    Route::get('/complaintFrom', function () {
        return Inertia::render('Complaintform');
    });
    Route::get('/complaintRResult', function () {
        return Inertia::render('Complaintregistrationresult');
    });
    Route::get('/queryTransaction', function () {
        return Inertia::render('Querytransaction');
    });
    Route::get('/transactiondetails', function () {
        return Inertia::render('Transactionsdetails');
    });
    Route::get('/trackComplaintStatus', function () {
        return Inertia::render('Complaintstatus');
    });
    Route::get('/checkstatus', function () {
        return Inertia::render('Complaintfinal');
    });
    Route::get('/DMT/queryRemitter', function () {
        return Inertia::render('queryRemitter');
    });
    Route::post('/search-remitter', [DMT2Controller::class, 'searchRemitter']);
    
    Route::get('/DMT/remitterAadharVerify', function () {
        return Inertia::render('Remitteraadharverify');
    });
    
    Route::post('/remitter-aadhar-verification', [DMT2Controller::class, 'remitterAadharVerify']);
    
    Route::get('/DMT/registerRemitter', [DMT2Controller::class, 'registerRemitter']);
    Route::post('/DMT/register-remitter', [DMT2Controller::class, 'store']);
    
    //Beneficiary start
    Route::get('/DMT/registerBeneficiary', [DMT2Controller::class, 'registerBeneficiary']);
    Route::post('/DMT/registerBeneficiaryStore', [DMT2Controller::class, 'registerBeneficiaryStore']);
    Route::get('/DMT/deleteBeneficiary', [DMT2Controller::class, 'deleteBeneficiary']);
    Route::post('/DMT/deleteBeneficiaryStore', [DMT2Controller::class, 'deleteBeneficiaryStore']);
    Route::get('/DMT/fetchBeneficiary', [DMT2Controller::class, 'fetchBeneficiary']);
    Route::post('/DMT/fetchBeneficiaryDetail', [DMT2Controller::class, 'fetchBeneficiaryDetail']);
    Route::get('/DMT/searchByBeneId', [DMT2Controller::class, 'searchByBeneId']);
    Route::post('/DMT/searchByBeneIdStore', [DMT2Controller::class, 'searchByBeneIdStore']);
    //Beneficiary end
    
    //Transaction start
    Route::get('/DMT/pennyDropForm', [DMT2Controller::class, 'pennyDropForm']);
    Route::post('/DMT/pennyDrop', [DMT2Controller::class, 'pennyDrop']);
    Route::get('/DMT/transactionSendOtpForm', [DMT2Controller::class, 'transactionSendOtpForm']);
    Route::post('/DMT/transactionSendOtp', [DMT2Controller::class, 'transactionSendOtp']);
    Route::get('/DMT/TranSaction', [DMT2Controller::class, 'TranSaction']);
    Route::post('/DMT/TranSactionStore', [DMT2Controller::class, 'TranSactionStore']);
    Route::get('/DMT/transactionStatus', [DMT2Controller::class, 'transactionStatus']);
    Route::post('/DMT/transactionstatusstore', [DMT2Controller::class, 'transactionstatusstore']);
    //Transaction end
    
    //Refund Start
    Route::get('/DMT/refund', [DMT2Controller::class, 'refundOtp']);
    Route::post('/DMT/refundOtpStore', [DMT2Controller::class, 'refundOtpStore']);
    Route::get('/DMT/claimRefund', [DMT2Controller::class, 'claimRefund']);
    Route::post('/DMT/claimRefundStore', [DMT2Controller::class, 'claimRefundStore']);
    //Refund End
    
    //Bus Ticket Booking start
    Route::get('/Busticket/getSourceCity', [BusTicketController::class, 'getSourceCity']);
    Route::post('/busTicket/fetchSourceCities', [BusTicketController::class, 'fetchSourceCities']);
    Route::get('/Busticket/getAvailableTrip', [BusTicketController::class, 'getAvailableTrip']);
    Route::post('/Busticket/fetchAndStoreAvailableTrips', [BusTicketController::class, 'fetchAndStoreAvailableTrips']);
    Route::get('/Busticket/getCurrentTripDetails', [BusTicketController::class, 'getCurrentTripDetails']);
    Route::post('/Busticket/fetchTripDetails', [BusTicketController::class, 'fetchTripDetails']);
    Route::post('/Busticket/storeTripDetails', [BusTicketController::class, 'storeTripDetails']);
    Route::get('/Busticket/getbookTicket', [BusTicketController::class, 'getbookTicket']);
    Route::post('/Busticket/bookandstorebookticket', [BusTicketController::class, 'bookandstorebookticket']);
    Route::get('/Busticket/getboardingpointdetails', [BusTicketController::class, 'getboardingpointdetails']);
    Route::post('/Busticket/fetchandstoreboardingpointdetails', [BusTicketController::class, 'fetchandstoreboardingpointdetails']);
    Route::get('/Busticket/checkBookedTicket', [BusTicketController::class, 'checkBookedTicket']);
    //Bus Ticket Booking end
    
    //Recharge Route start here
    Route::get('/Recharge/dorecharge', [RechargeController::class, 'dorecharge']);
    Route::post('/Recharge/processRecharge', [RechargeController::class, 'processRecharge']);
    Route::get('/Recharge/recharge2', [RechargeController::class, 'recharge2']);
    Route::get('/Recharge/manageOperator', [RechargeController::class, 'manageOperator']);
    
    //Recharge Route end here
    
    
    Route::post('/recharge/update', [RechargeController::class, 'updateTransaction']);
    // Recharge Operator Routes
    Route::group(['prefix' => 'recharge'], function () {
        Route::get('/operators', [RechargeController::class, 'operators'])->name('recharge.operators');
        Route::get('/operators/list', [RechargeController::class, 'listRechargeOperators']);
        Route::post('/operators', [RechargeController::class, 'storeRechargeOperator']);
        Route::put('/operators/{id}', [RechargeController::class, 'updateRechargeOperator']);
        Route::delete('/operators/{id}', [RechargeController::class, 'deleteRechargeOperator']);
    });
    Route::get('/recharge/onboarding', [RechargeController::class, 'index'])->name('admin.onboarding');
    Route::post('/recharge/onboarding', [RechargeController::class, 'store'])->name('admin.onboarding.store');
    
    //Utilities Bill Payment Route Start
    Route::get('/admin/utility-bill-payment/operator-list', [UtilitybillPaymentController::class, 'operatorList'])
        ->name('utilitybillPayment.operatorList');
    Route::get('/utility-category/{category}', [UtilityBillPaymentController::class, 'categoryDetail']);
    Route::get('/operator-list', [UtilityBillPaymentController::class, 'operatorList'])->name('operator.list');
    
    //Fetch Bill Details
    // Route::get('/admin/utility-bill-payment/fetch-bill-details', [UtilitybillPaymentController::class, 'fetchBillDetails'])
    //     ->name('utilitybillPayment.fetchBillDetails');
    Route::match(['get', 'post'], '/admin/utility-bill-payment/fetch-bill-details', [UtilitybillPaymentController::class, 'fetchBillDetails'])
        ->name('utilitybillPayment.fetchBillDetails');
    
    //Pay Bill
    Route::get('/admin/utility-bill-payment/pay-bill', [UtilitybillPaymentController::class, 'payBill'])
        ->name('UtilityBillPayment.payBill');
    Route::post('/admin/utility-bill-payment/process-bill-payment', [UtilitybillPaymentController::class, 'processBillPayment'])
        ->name('UtilityBillPayment.processBillPayment');
       
    //Status Enquiry 
    
    Route::get('/admin/utility-bill-payment/utility-status-enquiry', [UtilitybillPaymentController::class, 'utilityStatusEnquiry'])
        ->name('utilityStatusEnquiry');
    Route::post('/admin/utility-bill-payment/fetch-utility-status', [UtilitybillPaymentController::class, 'fetchUtilityStatus'])
        ->name('fetchUtilityStatus');
    //Utility Bill Payment Route End
    
    //Insurance Premium Payment
    Route::get('/admin/InsurancePremiumPayment/FetchInsuranceBillDetails', [InsurancePremiumPaymentController::class, 'fetchInsuranceBillDetails'])->name('InsurancePremiumPayment.FetchInsuranceBillDetails'); 
    
    Route::get('/admin/InsurancePremiumPayment/PayInsuranceBill', [InsurancePremiumPaymentController::class, 'payInsuranceBill'])->name('InsurancePremiumPayment.PayInsuranceBill'); 
    Route::get('/pay-insurance-bill', [InsurancePremiumPaymentController::class, 'payInsuranceBill']);
    Route::match(['get', 'post'], '/pay-insurance-bill', [InsurancePremiumPaymentController::class, 'payInsuranceBill']);
    
    Route::get('/admin/InsurancePremiumPayment/FetchInsuranceBillDetails', [InsurancePremiumPaymentController::class, 'fetchInsuranceBillDetails'])->name('InsurancePremiumPayment.FetchInsuranceBillDetails');
    Route::post('/admin/InsurancePremiumPayment/fetch-lic-bill', [InsurancePremiumPaymentController::class, 'fetchLICBill'])->name('InsurancePremiumPayment.fetchLICBill');
    
    Route::get('/admin/InsurancePremiumPayment/InsuranceStatusEnquiry',[InsurancePremiumPaymentController::class,'insuranceStatusEnquiry'])->name('InsurancePremiumPayment.InsuranceStatusEnquiry');
    Route::post('/admin/InsurancePremiumPayment/fetchInsuranceStatus', [InsurancePremiumPaymentController::class, 'fetchInsuranceStatus'])->name('InsurancePremiumPayment.fetchInsuranceStatus');
    
    //Fastag Recharge
    //operator
    Route::get('/admin/FastagRecharge/FastagOperatorList',[FastagRechargeController::class,'fastagRechargeOperatorList'])->name('FastagRecharge.FastagOperatorList');
    Route::get('/admin/fastag-operators', [FastagRechargeController::class, 'fastagRechargeOperatorList'])->name('admin.fastag-operators');
    //consumer details 
    Route::get('/admin/FastagRecharge/fetchConsumerDetails',[FastagRechargeController::class,'fetchConsumerDetails'])->name('FastagRecharge.FastagFetchConsumerDetails');
    Route::post('/api/fetchConsumerDetails', [FastagRechargeController::class, 'getConsumerDetails'])->name('FastagRecharge.getConsumerDetails');
    //recharge
    Route::get('/admin/FastagRecharge/fastagRecharge',[FastagRechargeController::class,'FastagRecharge'])->name('FastagRecharge.FastagRecharge');
    Route::get('/fastagRechargeDo',[FastagRechargeController::class,'FastagRechargeDo']);
    
    //status
    Route::get('/admin/FastagRecharge/FastagStatus',[FastagRechargeController::class,'FastagStatus'])->name('FastagRecharge.FastagStatus');
    
    //LPG
    Route::prefix('admin')->group(function () {
        Route::get('LPG/LPGOperator', [LPGController::class, 'LPGOperator'])->name('LPG.LPGOperator');
    });
    
    
    Route::post('api/fetch-lpg-operator', [LPGController::class, 'fetchLPGOperator']);
    //fetch lpg details
    // Route::get('/admin/LPG/LPGDetails',[LPGController::class,'FetchLPGDetails'])->name('LPG.FetchLPGDetails');
    Route::match(['get', 'post'], '/admin/LPG/FetchLPGDetails', [LPGController::class, 'FetchLPGDetails'])->name('LPG.FetchLPGDetails');
    //lpg
    Route::get('/admin/LPG/LPGBill',[LPGController::class,'LPGBill'])->name('LPG.LPGBill');
    Route::post('/pay-lpg-bill', [LPGController::class, 'payLpgBill']);
    Route::get('/lpg-bill-history', [LPGController::class, 'getLpgBillHistory']);
    //status
    Route::get('/admin/LPG/LPGStatus', [LPGController::class, 'LPGStatus'])->name('LPG.LPGStatus');
    Route::post('/lpg-status', [LPGController::class, 'getLPGStatus']);
    
    
    //Municipality
    
    //operator
    Route::get('/admin/Municipality/MunicipalityOperator', [MunicipalityController::class, 'MunicipalityOperator'])->name('Municipality.MunicipalityOperator');
    Route::get('/municipality/operator', [MunicipalityController::class, 'showMunicipalityOperator'])->name('municipality.operator');// only to fetch operators data from databse
    Route::post('/municipality/fetch', [MunicipalityController::class, 'fetchMunicipalityOperator'])->name('municipality.fetch');//used to fetch from api
    Route::post('/municipality/save', [MunicipalityController::class, 'store']);// use to stor fetched opertor from api to databse
    
    
    
    
    //fetch municipality details
    Route::get('/admin/Municipality/FetchMunicipalityDetails', [MunicipalityController::class, 'FetchMunicipalityDetails'])->name('Municipality.FetchMunicipalityDetails');
    Route::post('/api/municipality/fetch-bill', [MunicipalityController::class, 'fetchBillDetails']);
    Route::post('/municipality/save-bill', [MunicipalityController::class, 'storeBillDetails'])->name('municipality.save-bill');
    
    
    //Pay Bill
    Route::get('/admin/Municipality/MunicipalityBill', [MunicipalityController::class, 'showMunicipalityBill'])->name('Municipality.MunicipalityBill');
    Route::post('/api/Municipality/pay-bill', [MunicipalityController::class, 'PayMunicipalityBill'])->name('Municipality.MunicipalityPayBill');
    
    
    //Status
    Route::get('/admin/Municipality/MunicipalityStatus', [MunicipalityController::class, 'MunicipalityStatus'])->name('Municipality.MunicipalityStatus');
    Route::post('/api/Municipality/MunicipalityStatus', [MunicipalityController::class, 'MunicipalityEnquiryStatus'])->name('Municipality.MunicipalityEnquiryStatus');
    
    
    //Dashboard Route for various dashboard start
    Route::get('/dmt2/dashboard', [DashboardController::class, 'dashboardDmt']);
    Route::get('/bus-booking/dashboard', [DashboardController::class, 'dashboardBusBooking']);
    Route::get('/recharge/dashboard', [DashboardController::class, 'dashboardRecharge']);
    Route::get('/utilities/dashboard', [DashboardController::class, 'dashboardUtilities']);
    //Dashboard Route for various dashboard end





//DMT Bank 2 Remitter
Route::get('/admin/remitter2/queryRemitter', [Remitter2Controller::class, 'queryRemitter'])->name('remitter.query');
Route::post('/admin/remitter2/queryRemitter', [Remitter2Controller::class, 'queryRemitter'])->name('remitter.query.post');
Route::get('/admin/remitter2/queryRemitter', [Remitter2Controller::class, 'showQueryForm'])->name('remitter.query');
Route::post('/admin/remitter2/queryRemitter', [Remitter2Controller::class, 'queryRemitter'])->name('remitter.query.post');
Route::post('/admin/remitter2/storeRemitter', [Remitter2Controller::class, 'storeRemitterData'])->name('remitter.store');
//Remitter Adhaar verify 
Route::get('/admin/remitter2/remitterAdhaarVerifyApi', [Remitter2Controller::class, 'showRemitterAdhaarVerifyApi'])->name('remitter.showRemitterAdhaarVerifyApi');
Route::get('/admin/remitter-adhaar-verify', [Remitter2Controller::class, 'showRemitterAdhaarVerifyApi']);
Route::post('/admin/remitter-adhaar-verify', [Remitter2Controller::class, 'verifyAadhaar']);

Route::get('/admin/remitter2/registerRemitter', [Remitter2Controller::class, 'showVerificationForm'])
    ->name('admin.remitter2.register');
Route::post('/admin/remitter-adhaar-verify', [Remitter2Controller::class, 'registerAdhaarRemitter'])
    ->name('admin.remitter2.verify');
    Route::post('/admin/remitter-adhaar-verify', [Remitter2Controller::class, 'verifyAadhaar'])->name('remitter.adhaar.verify');
    Route::get('/admin/remitter-adhaar-verify', [Remitter2Controller::class, 'showVerificationForm'])->name('remitter.adhaar.form');
//Register Remitter
Route::get('/admin/remitter2/registerRemitter', [Remitter2Controller::class, 'registerRemitter'])
    ->name('admin.remitter2.register');
    Route::get('/admin/remitter2/registerRemitter', [Remitter2Controller::class, 'registerRemitter'])
    ->name('admin.remitter2.register');
Route::post('/api/admin/remitter2/register-remitter', [Remitter2Controller::class, 'registerRemitter'])
    ->name('api.admin.remitter2.register');
    Route::get('/admin/remitter2/registrations', [Remitter2Controller::class, 'getRegistrations'])
    ->name('admin.remitter2.registrations');
// Redirect root to dashboard

 
//Beneficiary 
Route::get('/admin/beneficiary2/registerBeneficiary', [Beneficiary2Controller::class, 'registerBeneficiary'])->name('beneficiary2.registerBeneficiary');
Route::match(['get', 'post'], '/beneficiary/register', [Beneficiary2Controller::class, 'registerBeneficiary'])->name('beneficiary.register');
Route::post('/beneficiary/register', [Beneficiary2Controller::class, 'registerBeneficiary']);


Route::get('/admin/beneficiary2/deleteBeneficiary', [Beneficiary2Controller::class, 'deleteBeneficiary'])
    ->name('beneficiary2.deleteBeneficiary');
Route::post('/admin/beneficiary2/deleteBeneficiary', [Beneficiary2Controller::class, 'destroyBeneficiary'])
    ->name('beneficiary2.destroyBeneficiary');
    Route::get('/admin/beneficiary2/deletion-history', [Beneficiary2Controller::class, 'getDeletionHistory'])
    ->name('beneficiary2.getDeletionHistory');


Route::get('/admin/beneficiary2/fetchBeneficiary', [Beneficiary2Controller::class, 'fetchBeneficiary'])->name('beneficiary2.fetchBeneficiary');
Route::get('/admin/beneficiary2/fetch', [Beneficiary2Controller::class, 'fetchBeneficiary'])->name('beneficiary2.fetch');


Route::prefix('admin/beneficiary2')->group(function () {
    Route::get('/fetchbyBenied', [Beneficiary2Controller::class, 'fetchbyBenied'])
        ->name('beneficiary2.fetchbyBenied');
    Route::post('/fetch-beneficiary-data', [Beneficiary2Controller::class, 'fetchBeneficiaryData'])
        ->name('beneficiary2.fetchBeneficiaryData');
});

//Transaction 
Route::get('/admin/transaction2/pennyDrop', [Transaction2Controller::class, 'pennyDrop'])->name('transaction2.pennyDrop');
Route::match(['get', 'post'], '/admin/transaction2/pennyDrop', [Transaction2Controller::class, 'pennyDrop'])->name('transaction2.pennyDrop');

Route::get('/admin/transaction2/transactionSentOtp', [Transaction2Controller::class, 'transactionSentOtp'])->name('transaction2.transactionSentOtp');
Route::match(['get', 'post'], '/transaction-sent-otp', [Transaction2Controller::class, 'transactionSentOtp'])->name('transaction.sent.otp');

Route::get('/admin/transaction2/transaction', [Transaction2Controller::class, 'transaction'])->name('transaction2.transaction');
Route::post('/admin/transaction2/transact', [Transaction2Controller::class, 'transact'])->name('transaction2.transact');

Route::get('/admin/transaction2/transactionStatus', [Transaction2Controller::class, 'transactionStatus'])->name('transaction2.transactionStatus');
Route::post('/transaction-status', [Transaction2Controller::class, 'transactionStatus']);



//Refund
Route::get('/admin/refund2/refundOtp', [Refund2Controller::class, 'refundOtp'])->name('transaction2.refundOtp');
Route::match(['get', 'post'], '/admin/refund2/refundOtp', [Refund2Controller::class, 'refundOtp'])->name('refund2.refundOtp');

// Route::match(['get', 'post'], '/admin/refund2/refundOtp', [Refund2Controller::class, 'refundOtp'])
//     ->name('refund2.refundOtp');
Route::get('/admin/refund2/claimRefund', [Refund2Controller::class, 'claimRefund'])->name('transaction2.claimRefund');
Route::post('/admin/refund2/processRefund', [Refund2Controller::class, 'processRefund'])->name('transaction2.processRefund');




});




//Another Routes for admin use only start
Route::middleware(['auth', 'isAdmin'])->group(function () {
    Route::get('/adminDashboard',[AdminController::class,'dashboard'])->name('admin.recharge');
    Route::get('/admin/rechargeDashboard',[AdminController::class,'recharge'])->name('admin.recharge');

    Route::get('/admin/wallet-balance', [AdminController::class, 'getWalletBalance'])
    ->name('admin.wallet-balance');

    Route::get('/admin/credit-balance', [AdminController::class, 'getCreditBalance'])
    ->name('admin.credit-balance');

    Route::get('/admin/lic', [LicController::class,'licdashboard'])
    ->name('admin.licdashboard');
    Route::post('/admin/licdata',[LicController::class,'fetchlicdata'])->name('admin.fetchlicdata');

    //Another Routes for admin use only end


    //permissions 
    Route::post('/admin/roles',[MainController::class,'roles'])->name('admin.roles');
    Route::get('/admin/displaypermissions',[MainController::class,'displaypermissions'])->name('admin.displaypermissions');
    Route::post('/admin/permissions',[MainController::class,'permissions'])->name('admin.permissions');
    Route::post('/admin/addnew/permission',[MainController::class,'addpermission'])->name('admin.newpermission');
    Route::post('/admin/update/permission/{id}',[MainController::class,'updatepermission'])->name('admin.updatepermission');
    Route::post('/admin/delete/permission/{id}',[MainController::class,'deletepermission'])->name('admin.deletepermission');

    //Roles only admin access start
    Route::get('/admin/displayroles',[MainController::class,'displayroles'])->name('admin.roles');
    Route::post('/admin/roles', [MainController::class, 'getRoles']); // Fetch all roles
    Route::post('/admin/addnew/role', [MainController::class, 'addRole']); // Add a new role
    Route::post('/admin/update/role/{id}', [MainController::class, 'updateRole']); // Update a role
    Route::post('/admin/delete/role/{id}', [MainController::class, 'deleteRole']); // Delete a role
    Route::post('/admin/role/{id}/permissions', [MainController::class, 'updateRolePermissions']); // Update role permissions
    //Roles only admin acces end


    // Member routes
    Route::get('/admin/members', [MemberController::class, 'memberdashboard'])->name('admin.members');
    Route::post('/admin/member/fetchdetails', [MemberController::class, 'fetchmember'])->name('admin.memberdetails');
    Route::post('/admin/member/add', [MemberController::class, 'addMember'])->name('admin.member.add');
    Route::delete('/admin/member/delete/{id}', [MemberController::class, 'deleteMember'])->name('admin.member.delete');

    // bank details
    Route::get('/admin/bank', [BankController::class, 'bankdashboard'])->name('admin.bank');
    Route::post('/admin/bank/fetchbankdetails', [BankController::class, 'fetchbankdetails'])->name('admin.bankdetails');
    Route::post('/admin/bank/activate', [BankController::class, 'activateBank']);
    Route::post('/admin/bank/deactivate', [BankController::class, 'deactivateBank']);


    // Commission routes
    Route::get('/admin/commissions/{userId}', [CommissionController::class, 'getCommissions'])->name('admin.commissions.get');
    Route::post('/admin/commissions/{userId}', [CommissionController::class, 'updateCommissions'])->name('admin.commissions.update');



    // recharge commission
    Route::get('/admin/commission',[AdminController::class,'commission'])->name('admin.recharge');
    Route::post('/admin/recharge/commission',[AdminController::class,'rechargecommission'])->name('admin.commission');
    Route::put('/admin/update-commission-recharge/{id}', [AdminController::class, 'updateRechargeCommission']);


    //airtel commission
    Route::get('/admin/cms-airtel',[CMSController::class,'cmsairteldashboard'])->name('admin.airtel');
    Route::post('/admin/cms-airtel-fetch',[CMSController::class,'cms_airtel_fetch'])->name('admin.fetchairtel');




    //utility commission
    Route::post('/admin/utility/commission', [AdminController::class, 'fetchUtilityCommission']);
    Route::put('/admin/update-commission-utility/{id}', [AdminController::class, 'updateUtilityCommission']);

    Route::post('/admin/gasfastag/commission', [AdminController::class, 'fetchGasfastagCommission']);
    Route::put('/admin/update-commission-gasfastag/{id}', [AdminController::class, 'updateGasfastagCommission']);


    //cms commission
    Route::post('/admin/cms/commission', [AdminController::class, 'fetchCmsCommission']);
    Route::put('/admin/update-commission-cms/{id}', [AdminController::class, 'updateCmsCommission']);

    //dmt commission

    Route::post('/admin/dmt-bank1/commission', [AdminController::class, 'fetchBank1Commission']);
    Route::post('/admin/dmt-bank2/commission', [AdminController::class, 'fetchBank2Commission']);
    Route::put('/admin/update-commission-bank/{id}', [AdminController::class, 'updateBankCommission']);



    Route::get('/admin/fund/request', function () {
        return Inertia::render('AdminDashboard/fundRequest'); // Replace with your actual component name
    });
    Route::get('/admin/ip-whitelisting', function () {
        return Inertia::render('AdminDashboard/ipwhitelist'); // Replace with your actual component name
    });
});



//Login crediantials start

Route::get('/registration', function () {
    return Inertia::render('registrationForm');
})->name('registration');
Route::get('/', function () {
    return Inertia::render('loginPage');
})->name('login');
Route::post('/register', [AuthanticationController::class, 'store']);

Route::post('/login', [AuthanticationController::class, 'login']);
Route::get('/logout', [AuthanticationController::class, 'logout']);


//Paysprint route start here
Route::get('/logincheck', [DMT2Controller::class, 'loginCheck']);

Route::get('/unauthorized', function () {
    return Inertia::render('Unauthorized');
})->name('unauthorized');