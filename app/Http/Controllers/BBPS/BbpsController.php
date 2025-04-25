<?php

namespace App\Http\Controllers\BBPS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\CJS;
use Illuminate\Support\Facades\Http;


class BbpsController extends Controller
{
    public function billerInfo()
    {
        return greetUser('Hira lal');
    }
    protected $accessCode = 'AVCU98BI86TU91GDGO';
    public function billerId(Request $request, $biller, $type)
    {
        try{
          // dd('Coming');
            $key = '48ECC74C29EB85471E7511C54C0F310A';
            // format
            $xml = '<?xml version="1.0" encoding="UTF-8"?><billerInfoRequest><billerId>' . $request->biller . '</billerId></billerInfoRequest>';
            $billerId = encrypt($xml, $key);
            // dd($billerId);
            $url = "https://stgapi.billavenue.com/billpay/extMdmCntrl/mdmRequestNew/xml?accessCode=AVCU98BI86TU91GDGO&requestId=98pjO63P1123k5pq89lll56p21m2345n78v&ver=1.0&instituteId=NT05";
            $header = array(
                'Content-Type: text/plain'
            );
        
            //  $res = \MyHelper::curl($url, 'POST', $billerId, $header);
             
            //  dd($res);
             $res['response'] = 'bf2d0561c5593084bbe58efc63d7996278c29d503fdda62888f19afe0e815259a0b928e83a01bc2ef4c6cbe304079f1c1d53dc8b5fdbed03cbeaf4fe9988d7c5bb1e7e829b9c0c2194ce76ad03adba493b101f8f3d9a062e22fdb1b71c4990175555ab407a4b39642d6a7b0c4d01bbff66b8cf55a6e81ce1e51f8042277672795d71aa68455da830d80c0568da7c5c42bb538387a90f9f17a73061f353b9f9526340e97c3a64d0b5acd7996f3d4e203df5efeca4d0a467a3e46d6513bed91f3b71448e3f95d8bfdc24e67710bdcdfc30cda74b226ef889dc2adeb74eeb04a54ff6827bdb6ad5ee90891b988c3c99edc9b7e1c7fafc0a8548c289f85c8fcdf823825d19ce0f587c8fe64f66438e640618982589a24a298550ad37945e89876d0fbc876cb0991c6def4b89c53869336ecbf5a95dd6eba550847344f7e846aba56765a0ddae860bb98d02bf8c70d61693d995e3ebf39a717a8b47b61baf93868f8e40c700df482f35437ec8c3ee292dd8dc66920ae53602e191db1702106bc679a43b027bd8e167816a160c75bce8e4c42459d26ef0a7139bc28509fa907603d1ed4b8fb06b030e095f64a377270eabac1e6fa41bd2d566914f25f7fbb9b941cd0bbbbaee440546e641a500371ff199dd413d5554edc6d56abf968dd6fafa742a17e768f548a3ff7103e0c2e89060a0a21d1b487fd873f06e2d95d7305a64bd0d89c9f680e3b54f36d37dc4fa9fb8e1ea59b8142701d1c7ec7efe968566d412b1e74cc36ba3bf6bfca1f17925d158f2f70a86d0ec64b5943ad364b18ab3b046851f237000c27fc1083865255d843fb232cdae83b41d8b5831a550b98e07394d85949e513b72e51784aa9be0d63eae9bb501bbf30bfb495303a4ebdca63c1a66f0f751db06c54c4875cf643d64c81de22c56200d2b55a5d43117596f85b1f988f6b879bc42b3240b62832f7b4e382ffd30648b63b07b5e38e49e648c3b7cdac5e1ebe6b60dc2bbccbb8f02938c0c8cd52176d05234b65b5e5afad8beb9bbe91d35cfe1fb603c66d9e5a1f9446bcec3c613392232d720afb245967e13766f98730474e2fded353916d2ceca5da9c82329faaa6e5d349094b75397ae94dc5628ed1edf7f1615578167957247d2fb0c21cd4eae1bb6fe836653a6e76327d6dd092c8e8c0b145fba0f4acbec20f290e7ab8b8e88b071b517e0c5979a93d8cd4dada73a65';
             // dd($res['response'], $key);
             
             $billerInfo = \CJS::decrypt($res['response'], $key);
            //  dd($billerInfo);
             // Convert XML to JSON
             $xmlObject = simplexml_load_string($billerInfo);
             $jsonData = json_encode($xmlObject);
             $arrayData = json_decode($jsonData, true); // Convert to associative array if needed
            //  dd($arrayData['agentId']);
             return response($arrayData, 200);
        }
        catch( \Exception $e)
        {
            return response()->json([
            'status' => false,
            'Message' => "Ip Not Whitelisted Yet."
            ]);
        }
    }

    public function fetchBill(Request $request)
    {
        // dd('sdjnds');
        // dd($request->all()); 
        try{
        $key = '48ECC74C29EB85471E7511C54C0F310A';

        $url = 'https://stgapi.billavenue.com/billpay/extBillCntrl/billFetchRequest/xml';
        // Get request data and convert to array
        // $data = $request->all();
        // dd($data);
        // $agentId = $data['agentId'];
        // CC01CC01513515340681
        //format
        $xml = '<?xml version="1.0" encoding="UTF-8"?><billFetchRequest><agentId>CC01CC01513515340681</agentId><agentDeviceInfo><ip>124.123.183.137</ip><initChannel>AGT</initChannel><mac>01-23-45-67-89-ab</mac></agentDeviceInfo><customerInfo><customerMobile>9898990084</customerMobile><customerEmail/><customerAdhaar/><customerPan/></customerInfo><billerId>OTME00005XXZ43</billerId><inputParams><input><paramName>a</paramName><paramValue>10</paramValue></input><input><paramName>a b</paramName><paramValue>20</paramValue></input><input><paramName>a b c</paramName><paramValue>30</paramValue></input><input><paramName>a b c d</paramName><paramValue>40</paramValue></input><input><paramName>a b c d e</paramName><paramValue>50</paramValue></input></inputParams></billFetchRequest>';

        $encRequest = \CJS::encrypt($xml, $key);
        // dd($encRequest);

        $parameter = [
            'accessCode' => 'AVCU98BI86TU91GDGO',
            'requestId' => \MyHelper::generateRequestId(),
            'ver' => '1.0',
            'instituteId' => 'NT05',
            'encRequest' => $encRequest,
        ];

        $header = array(
            'Content-Type: application/x-www-form-urlencoded'
        );
        

        // $res = \MyHelper::curl($url, "POST", $parameter, $header, 'no'); 
        // dd($res);
        $res['response'] = "bf2d0561c5593084bbe58efc63d7996278c29d503fdda62888f19afe0e8152594170605746b1f12226fb6441948ffbabb11a683ec1dd63e21c175f325f3748e80f809c5d139f8b4b6f57392f5c4f358311474bbb8e64ba1da72e0fc38779e66b5516866c17ad3df8db862e851758baec4b33c4b312851c06ab30fa87bb78765ba2714524a8444f3e8c297dbf84fc10d33fb4c355a6d12fed90e21eadd76e1f22cc95914d8d748fc9a41f3864ea12cbfb67f4a758a3c57452755edf9cbb49cd15797dabb546adc04d2a62d0a1474a740d1340d9dd01805b4832fbe3eaca0bd304cf7f6b3452403e8b5ffb0237bf88b7a5fd69b7631039c2ce61da91df82bd185409941edd2f0d5579cc819aee45936ddb68395b1f5d5a072046166f30b8e3cdde1d575d7209ab3fdf2157b9bfef86279234652654a7af7239dc6942156afeff9df493bcb1c9e7b79829265ef6295b553b0a7013cf68859f17dfa0ba75cf484412ac983379c26ad98b993f61d959488bcd53acf4df097b51bcba1cec58541c6165b46d0e679ef0ddfec4315419811ec5f367212746091e630f257457bfdfec9f35052843e155c02a64909b98376bcaf81af242feccb8ba4716bf9f094b752a0dfe92faefe51d9abca4ef40b04c40d2ac905fd80da442c0d51314228e67d86cee9dcede1f6d9f424cfa9bd5f400afdc9d5962e78f2ab41acca261b93e3204d325b0593c151eb97094784faf1579117741d3cf6a89b388f02b28a0853260700d0d1ebe5d697de49b9fa0719f87d145ff1f2b7e6230e27329ea17c0c0d66af9da249fe20b6b049a95e89cc7aec16ff7e2c1c8ecbf2ba2c83bd0b554c746e8b50b4d37720cb84d115ded71ea953d9743e452ea88c453b624735c3067d28343fd675cb454cc48f4a3003267df644599209e978c2fccc5dc8bdfb3388eaf535a3e7b803144cee46a29b755abcdbafb81bc26616a60a8991559edd0130f4620652ae9dac3aade4608566678f81f2cec5a1b56ac979e1bfde0e70a819229c1031664c2a12058666ceec20e13e5b7eab1565b758f58c6c3bc72e27b3e5016918b94018ac64f544bc98af6989bbb47db2ce4b4bf6bd6f805d2de83a4865da43d37b4b20937ed876995802d2a9e97b186cf8c63e9e75f03b230966ff20b0999c78c0cc580fdbbe034438ae05f722a432c9b7759e563dab1e33b8b6c467c3cbcd4fbadaa58dcef7140ddc4c531c14a8e7f93ca9c0e5ddc841788aa08fa90fedea88a47a3fda9e02f2a7a249bd53fbb9538335072232dc4060abba833e2735a92db66f13b8581daaf112d1b514db738949918cb25749cff71884bab46512c78af20420b5122da2381e940ee330940b62183454e10bc92f7f50e1900e3714905d27d73c02a8542981f4a22580b27358ce7c6898f769c316414e81e88ccf11a1e2b940a0cba7a049258c410167c277095e148d6a104abf4a2e6a13471f49521993a282bede1ad62418ce5e08910c82477f70bc8550bde048773df8819c4df9761ffef21fe8618aa1d28405f27a6a5b6d57b6fd2bd460a300e64e2a6680b79511ba49b70f03c9648162dbeb16c4861a6198b5ce73308dafb1f8ce5b555f6543232355d39a3a0dc1d2c36902c752c120300c5e4c1d3415078cfac3964a62c3b2e23924425f9e6c2986414b3fd77e353ad136876f0b3a80a3cf0d7ccd3a63ad94b4b7051ae260f8223f239d2e2b67a7cedc96f52ea869470eaa38a852a587f841b5b4c30788e9e53f4f1c817a3d89f877abba3bd66562d06285efe84ae3d211d74bc131126923680ece26e714b974843d1d07372e59aad8b9246";

        // $res['response']
        $billdetail = \CJS::decrypt($res['response'], $key);
        // dd($billdetail);
        // Convert XML to JSON
        $xmlObject = simplexml_load_string($billdetail);
        $jsonData = json_encode($xmlObject);
        $arrayData = json_decode($jsonData, true); // Convert to associative array if needed
        $fetchdata = [
            $arrayData,
            $parameter['requestId']
        ];
        // dd($arrayData);
        
        return response()->json([
            'success' => true,
        //     // 'data' => [
            'id' => 'TXN123456',
            // 'billerName' => $request->biller,
            'billerName' => 'Hira lal',
            'mobileNumber' => '6203728749',
            'customerName' => $arrayData['billerResponse']['customerName'],
            'billAmount' => $arrayData['billerResponse']['billAmount'],
            'totalAmount' => '20000',
            'billDate' => $arrayData['billerResponse']['billDate'],
            'dueDate' => $arrayData['billerResponse']['dueDate'],
            'approvalNumber' => 'APPROVE9981',
            'a' => $arrayData['inputParams']['input'][4]['paramValue'],
            'ab' => $arrayData['inputParams']['input'][3]['paramValue'],
            'abc' => $arrayData['inputParams']['input'][2]['paramValue'],
            'abcd' => $arrayData['inputParams']['input'][1]['paramValue'],
            'abcde' => $arrayData['inputParams']['input'][0]['paramValue'],
            'billNumber' => $arrayData['billerResponse']['billNumber'],
            'latePaymentFee' => $arrayData['billerResponse']['amountOptions']['option'][0]['amountValue'],
            'additionalCharges' => $arrayData['billerResponse']['amountOptions']['option'][2]['amountValue'],
            'transactionStatus' => 'Success',

        //         // more fields as needed...
        //     // ]
        ]);
        return response()->json([
            'status' => true,   
            'id' => 'TXN123456',
        ]);
        
        return response($fetchdata, 200);
       }
       catch (\Exception $e){
        return response()->json([
            'status' => false,
            'message' => "Ip Not Whitelisted Yet."
        ]);
       }
    }

    public function paybill(Request $request)
    {
        try{
        $key = '48ECC74C29EB85471E7511C54C0F310A';
        $url = 'https://stgapi.billavenue.com/billpay/extBillPayCntrl/billPayRequest/xml';
        $data = $request->all();
        $xml = '<?xml version="1.0" encoding="UTF-8"?><billPaymentRequest><agentId>CC01CC01513515340681</agentId><billerAdhoc>true</billerAdhoc><agentDeviceInfo><ip>103.250.165.8</ip><initChannel>AGT</initChannel><mac>01-23-45-67-89-ab</mac></agentDeviceInfo><customerInfo><customerMobile>9898990084</customerMobile><customerEmail></customerEmail><customerAdhaar></customerAdhaar><customerPan></customerPan></customerInfo><billerId>OTME00005XXZ43</billerId><inputParams><input><paramName>a</paramName><paramValue>10</paramValue></input><input><paramName>a b</paramName><paramValue>20</paramValue></input><input><paramName>a b c</paramName><paramValue>30</paramValue></input><input><paramName>a b c d</paramName><paramValue>40</paramValue></input><input><paramName>a b c d e</paramName><paramValue>50</paramValue></input></inputParams><billerResponse><billAmount>100000</billAmount><billDate>2015-06-14</billDate><billNumber>12303</billNumber><billPeriod>june</billPeriod><customerName>BBPS</customerName><dueDate>2015-06-20</dueDate><amountOptions><option><amountName>Late Payment Fee</amountName><amountValue>40</amountValue></option><option><amountName>Fixed Charges</amountName><amountValue>50</amountValue></option><option><amountName>Additional Charges</amountName><amountValue>60</amountValue></option></amountOptions></billerResponse><additionalInfo><info><infoName>a</infoName><infoValue>10</infoValue></info><info><infoName>a b</infoName><infoValue>20</infoValue></info><info><infoName>a b c</infoName><infoValue>30</infoValue></info><info><infoName>a b c d</infoName><infoValue>40</infoValue></info></additionalInfo><amountInfo><amount>100000</amount><currency>356</currency><custConvFee>0</custConvFee><amountTags></amountTags></amountInfo><paymentMethod><paymentMode>Cash</paymentMode><quickPay>N</quickPay><splitPay>N</splitPay></paymentMethod><paymentInfo><info><infoName>Remarks</infoName><infoValue>2</infoValue></info></paymentInfo></billPaymentRequest>';

        $encRequest = \CJS::encrypt($xml, $key);
        $parameter = [
            'accessCode' => 'AVCU98BI86TU91GDGO',
            'requestId' => $data[1] ?? null,
            'ver' => '1.0',
            'instituteId' => 'NT05',
            'encRequest' => $encRequest,
        ];
        $header = array(
            'Content-Type: application/x-www-form-urlencoded'
        );
        
        // $res = \MyHelper::curl($url, "POST", $parameter, $header, 'no');
        $res['response'] = 'bf2d0561c5593084bbe58efc63d7996278c29d503fdda62888f19afe0e8152594170605746b1f12226fb6441948ffbab45239ccacf4fff5f47c430d68ed36c57bf86f645a80ce78044ad2555f4ce7c554390a82378edfe21efba9439d0f9438c4c0c698656ec021b54bfc2a9dcc9f66a74cf5d8b984c20f587da730985c83fec1c858d0965d86b7348409c89152e73941a3f1474c3b0b740999a9d1dfbb6d34a87a0fb2c28f1b693a4c3ada20c9635bbfb988f95de0cf4ef98c51a0b0110f3d7da707ab5528d5d74ae471294f55e094122945d6e5aea5012143038f5ccffd03d28ef081497181d5f310a62ad199b366be2ba316769519a7d97fdd364995bc86060a0237b73307e991bc17a586e2197dd9db5dc8020872f3b68e76dba26b76062b2dbe37c5fad10a103dec0e985118015ed4690108b8c0b1771e5e4e20b22a22461cd2d09138c69f736a300234d8b3c33ce02b4a61751c6294483639084e76bc7132de53470162dc539b912ca13c3cf78b3cf915f70d19f4fbb4f820be23d2e16dc6c6777792d3014dbec3f53c0d8ea67b126341e0eadc3baca9fb248a476e062ec5cae742e29ee21d3888f56b121c2a849e80d55a99313fefdfa398557e9cb8fa208e5099e50b44ac5a4fecd244a41b2d18a2a0cd82cb1d01239b92a16bcfce238fdf2d2195552054eb947c388266e3ea2b0ea04dbfbeadd3488467e5d868644589cc33346aa79fc0ab2d38f3a38821a8dc01dc7521f65a08e9556145a155a645f0b9621d3f67c894d553247d34f5d11c8911b3c99275524191a7c36ca8dc933f11cfcb454e1218f5eb579761c1f29d29828cb0117e004dcbab6d95ff0407c448f1c961af9e26de81ba81aa244dd56552bd0bdb5288ed6af7c96339fcd60f5d0ad472afd2fdae7c16f34505615ef6517a5691f8bc7f32fb1933dd6788bbf3e363c5a6d7f5b61c4c60d18c6548f9f291d7aa80103d599f3de9892ef08d4c23f54a84dfcb4c9ee657cb7acfa33d45a850ab055f090bf30669fef0a4f3b9196a96e258b87c6a3c97d5c04e0da40ffa6a5f7fe7e6f834c24ff338841b0c2e163eab6b9f430bc8cd7f7b3998c5a87c9d85dc617721fe70ca87948d3152ccffc7befc069934fba9df405c939db173f127cbcd029ba5e92bdd7a3f8840d0d38dbbb63c78aba0af30f283fdce010dd4617a4d7d13d61fb68f03919d835e38386cbdce75c20e38e6b34667027cb1d5121abde1c0005b00436296c56c1edea49e6cb3a2901e5b62c6072aa850a296bbe9acbb9835d45a8a5cbd848acb5fd119811bb39dc4bd371c676d7f3f7aa18b723e1ba2214ab534753381ea67dcfef655d4326d3b37672a46423f69008723bfd42c7a0ea82db2b6d40605b1c82bbd094cfc6c17c818fc1b50c2c40e1ed91707c691effa6a4f1';
        $paybill = \CJS::decrypt($res['response'], $key);
        // Convert XML to JSON
        $xmlObject = simplexml_load_string($paybill);
        $jsonData = json_encode($xmlObject);
        $arrayData = json_decode($jsonData, true); // Convert to associative array if needed
        return response($arrayData, 200);
        }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => "Ip Not Whitelisted Yet."
            ]);
        }

    }

    public function billPayment(Request $request)
    { 
        try{
        $key = "48ECC74C29EB85471E7511C54C0F310A";
        $xml = 'bf2d0561c5593084bbe58efc63d7996278c29d503fdda62888f19afe0e8152594170605746b1f12226fb6441948ffbab45239ccacf4fff5f47c430d68ed36c57bf86f645a80ce78044ad2555f4ce7c554390a82378edfe21efba9439d0f9438c4c0c698656ec021b54bfc2a9dcc9f66a74cf5d8b984c20f587da730985c83fec1c858d0965d86b7348409c89152e73941a3f1474c3b0b740999a9d1dfbb6d34acb1de1085ba0b7577873cdf34ff694dc04e188c72b5ed7877b0c3bc56dff0fa982ef44d4d61d039b2971c73e4bee58e8d14963cbe1cf00ca9e4c4413333d714c716ea12832d4f66a2bdd228d173b77fedc56bfec082fc25d067145c89251b74f2fada47dd1ea0b78726c67adcc6ef55d96261706c16d882f4200828414a37aade63374a91663a716751d01f16b3832bab014bfe4c7669e58d791e967bf12e72cf11e2a19f5a328d2fc2feb7869e40f98d8694c1ac4b78aebad3d607201143f4e484d1eb29c2a3abf9b63c5dd79993f23de0cfa48430886bd0c187e8fa5f7a164f6d7148db68ad072e56783462790c0a1017cf0969c2ad84086bdf02d7baeb680004c06b3c43a09d4da7d57a26db3059fbcfc9ece087aebe025d5a9a874cb984cc8b0c03dd90666297e9d4d015b8ae7b9f6b8414965686d907ffc8541d8479fdf5ec070478779df5fa04e92c058712478ac03f2b1cbdb9a9ff067b8216246bdcb1867543b65c66f7a572a5048ed83ab42c97e9d12a520be70be589d2702d93e0515332a45d3add42eeb8d88a419235983862b33241e784039bb0bf3cd20a55694789b3eb1ee1efae9b050e52e8ef92fda7d74bceaf65198dd9587c31ac83fcb22e42c8081b0a9fa0d2816d0c4a252a57f749f612370648a4c02da1b602839b32f0b04b9c811c3af7e013c4d1c790db1fa4c38f6e7c31b59502a01e47358e6ba855e9f0166a60f691b199e6b206bc9315e4adc4c66b5739e5a4f088ae263a6c0070fab7caf520947d5aae9a23f7cd3ef0604675536309d2b2d6ede8e3b33d2ee79dbebc804e702937d0abbcf2a7b7943465fd14db3eaf218ef44bcf6c4507d127a767dee4e9ede96c43c1b020e690d6b48698a42437e365d46520baa6ac445e7ec2f23e713a7c72052d57d51bd0809bf0d7f985e59fd1e721974562e33623607a955db7d29bdf96eb6eb509a0cac9037c60441441b2b9150ea634e72a802d299369389e5cae1a686170c7b6464ccb210cf3beaaf59c345ec3acf183da5f4dd6d22f4d52425fc7a4523aec6b1805d0eb72cbacfc0efd6cc7424cb9f7a95218c3b131b1eb843e40e4164795997af3cd6bda1a40fb6346b0a6b45082f7ebd796d8c8c9227f650b1343691dec50af1bf8ffe090ff9d78a23087faf0b4606c28d9e585307ea7ccadcaeafd2bc01dcba77fb0496';
        $billerPay = \CJS::encrypt($xml, $key);
        $url = "https://stgapi.billavenue.com/billpay/extBillPayCntrl/billPayRequest/xml";
        $header = array(
            'Content-Type: text/plain'
        );
        $res = \MyHelper::curl($url, 'POST', $billerPay, $header);
        $billInfo = \CJS::decrypt($res, $key);
        $xmlObject = simplexml_load_string($billInfo);
        $jsonData = json_encode($xmlObject);
        $arrayData = json_decode($jsonData, true);
        return response($arrayData, 200);
     }
     catch (\Exception $e){
        return response()->json([
            'status' => false,
            'message' => "Ip Not Whitelisted Yet."
        ]);
      }
    }

    public function transactionStatus(Request $request)
    {
        try{
        $key = "48ECC74C29EB85471E7511C54C0F310A";
        $xml = 'bf2d0561c5593084bbe58efc63d7996278c29d503fdda62888f19afe0e8152594170605746b1f12226fb6441948ffbabe6fe3e7c47c11ebf64a79167340dc950dd7a10a0bcc759578e10dfc28023b5e1ad2a078ad52ef53b77859f7f17a6bbd7612f09ac311b5daba73248ae3129ddc8dcf5c004aab55544a98a0862f0cf50c8a014e1ff8b71ce1a3f0b6489c96328641d19cfd405ed993c114efd700550419e18df4d04cdc5805a578485f9fe304ee2d66741053082b1465006e645fc4c3b69808e69bcefef66d24ec574a312327177c2047afbe226c1cc328e3114bf353bddd4e6ef71692d4eb815a8501e9a54139f395f12d1e248935e573188b4b8a35de0a3b3a750b26a5c0b88691922b8079bcc2da25e9d3439dea7b494bdb7e38da8decbe584fcddcab91298493351f3d876fced03a7aea9d7b780c5a9edcf1b557d90aad0d91ed74a82f93c10e90ce0e41bf6281d1157a1a4a97851f93fef2b9e0de82e289f5bfe7764d900ddf1de701855462e6c463e30520ad9f0732fedd9cbbed031e0dcd1d4d837490907473bebf34a49e2ce4b7e9320b4ed9a1ca5896cde547a879f1d5744cae1ae2219231058abd32a78b9a9a5a6946333d39d94696b4edb05a03c02552726980e575afaa1f5b51138c67ccb94453afb6a5a372116e6784b49586984dd165e2d94097b963cc84a4429f590b69d62e6420962a981c366e4f5d5ecf375ac2cc64b73003313227a773853234f0a7f3accd6901ae09a143c8387eb1382fabaec239464d1d6a21ca21fe89a2e7fcbf99ea20bbcb01c12157164b3c51af1b626f874587d81be103e651d681c60f0eca24276d4a34844e68158970009771932bd56352fc77d125c5c788b5215f583fec2399f56c7ac0b421c214386b9c3f41faccf96f3b9b398b0d9619ded54e9414c83a3a382f6e24115c71176e0ef480faacb36a9d560ae3192e1ed09a46ff6d28415d3fcab1936babf7fbfaa10fa3ef06d955f91257803bd73408af4ddffecfc2f9d8d7b55d0aa4b80501081f7518955ddefa71d36b95d83d6696d5e00cb4dc715611d9f33659677b5a7bdee6a967cb24492d12822abbb9b23373412aafbadae6b1372b4b0cc80d1dba501c13e30d8d4b95f5b5f1c2066440d98829718c881b44ba6655e1441de17eb8309d40ac29f9e981fd27c0f2fdb887e30f3c00ad05390403dfe1c8d655cbc3797c1c981f09823baee346287a4b339b89a2ee45aceb656417c4138057e5be2a08de4599cc01e8010b9f73ae68406fba33adfa62d09c3b96f828cc5e1ba39369c21430f8a5741a0e0199b51faf6945abf3ea258c8671b5da2085e78b15bf1afd7473d691756367241c538d8dffa2a0c8c50f0db044b898b971ee278a033fb7f64270919a168935cfcd6884292e5cea325d5be7d0662c6c4fb809cb60ff32e69ae2567cd172a3bfe701ee2524388a0f5e0885c749b1d61fd160a3e8867953bcfc240b11fd769a0ed3d65aebc0c20b3a75571d2ec0bec8344d1381bd63af46fef5e7652f8907008f4144423b0bc3f36397841003545d3951ef0cd3e04f9e60edace9f4659332a05db1cccde7b296f320c271b0262ac0b6e36ad1b05f855b245c3c2931a923e00ca23b87bf05b7110aade25f26837764f1cc1789318c33e56cd3ae13ae8cc2b8c2292288bf0fc70403cbd757ccb8749d7a2eaed6ca975dc25cd0aeb0c22f4414276dcd6783cbc5a71145dac00aa07f936c9cdb0e0d79d0696be6616be76bc88b4fecdda62571251060ba8977c4a62b250a4c2c76e2ab9a39440ed12c8f1ccee7141c9d860feee757c4e19757d0f724a4d2891988c61cbf09c225c71968f507c19305d0575df99fad6f1a25e2a5a10f6ef4fd1e5bb925713c0c6bc145481bf8467de0d83dfeeb0e2aca7c09f2339ed27538c492c5967166970716da4680793f70743140b47d7e156be118e15cc459a7ffa958c4be66bb004fe39debc1546834d9eafefa5bc0b2b9a498158ba194dc5c71ddfe5c7329424d0eaf162c2b470153cd9258b82d817d08e2d3b7cced42f5a9de2a2e116096a9bb7d2f821ac71e172d6c31e5e427879a48e1ec3df62db74bf041eb496c656369a0285888c5a3d0ae2f50e2fe73f4a36758a59501dc933a75ac2d9c856f1530a7a73f3fa2de58e6f748c11bf4bd31c63f1c8d9e6391640be42a4fa69ab1fcb3f9637bb6c010cf0ec9719a8ead4fc7aa53f6679d63c18143fe4c3d73b27a52faf0e2037e81ba8bcba2ad76d45a5543c81feb13467b3c4912e683bc05f7b9c067abaf99a3a6e1e1525eac7a48e39bbb9d7094f276901c605814b0a42';
        $billerPay = \CJS::encrypt($xml, $key);
        $url = "https://stgapi.billavenue.com/billpay/transactionStatus/fetchInfo/xml";
        $header = array(
            'Content-Type: text/plain'
        );
        $res = \MyHelper::curl($url, 'POST', $billerPay, $header);
        $trans = \CJS::decrypt($res, $key);
        $xmlObject = simplexml_load_string($trans);
        $jsonData = json_encode($xmlObject);
        $arrayData = json_decode($jsonData, true);
        return response($arrayData, 200);
        // dd($arrayData);
       }
       catch (\Exception $e){
        return response()->json([
            'status' => false,
            'message' => "Ip Not Whitelisted Yet."
        ]);
      }
    }

    public function complaintRegistration(Request $request)
    {
        try{
        $key = '48ECC74C29EB85471E7511C54C0F310A';
        // dd($request->biller);
        // format
        $xml = '<?xml version="1.0" encoding="UTF-8"?><complaintRegistrationReq><complaintType>Transaction</complaintType><participationType /><agentId /><txnRefId>CC014110BAAE00054720</txnRefId><billerId /><complaintDesc>Complaint initiated through API</complaintDesc><servReason /><complaintDisposition>Amount deducted multiple times</complaintDisposition></complaintRegistrationReq>';
        $billerId = \CJS::encrypt($xml, $key);
        // dd($billerId);
        $url = "https://stgapi.billavenue.com/billpay/extComplaints/register/xml";
        $header = array(
            'Content-Type: application/x-www-form-urlencoded'
        );
        $res = \MyHelper::curl($url, 'POST', $billerId, $header); //response temproarly
        $res = 'bf2d0561c5593084bbe58efc63d7996278c29d503fdda62888f19afe0e8152594170605746b1f12226fb6441948ffbab5ffb60f7deefa2b88ee70680bb77e3c6119491be5c771c6acb871ca31262e336ea5ee1da30a81a7b2595e19205831afaf0f2f470283f70fdfc9a93cd59c2626bfb9a7d931e18472707fcb7daf3bb95b6252590949087ddccc73b5b27266382a4ca7f39da4f08510f4f93be745ceb94ee7b67653fe4cd2602ca4e0bd7bcfc022d982c2b9fd897a33e33b54c5e4f0e7588c5751d2d33a461bc482adeccb6a9afbda0a0764e040fb90db1a2bd57f9c29c0957748039ae9c80372216f5714085682dc839f2b28ccbbb13387dbc522b9a112073ec36b7372bb5977528c5dd65f50fc40c84af8b14231b1e83151297a0aa9160e4c3042a2e04e572875a144437fdbff0e7c72c4819dc176733b7483debab8d7073577e0c37ef745ead49c37afc2a46ccbe018529a658240b0627871f0a9fbe67bc56355383f5b2ef418fae417271454b83f3b9d4ddadacd199dc1a29fb63a4a32b0ca7a892fae08564a7d4bf09a4f8ef7c6041273d1a854db39e4bf21c38ffed6f77a8e86a1ee29e8a81b644cea7216ba138a368bfd2a404a55169ad8e7c1bb5be1af11b47b348d00ee18e8cc6ae38d03981687095aa3a281f0004f3871205c1036c785f41543aa15a218bd162680266ba43c5fa8da1f34e0fc8bdc5b3f6b213f16c699e9395cf786a5512e9ecdb3863570208792ae99f66864f0705dab17fe49348e29039166f342fe5e48f51c7b2564b8f0b956071e495319fb152bfae7253d7f3224611f3dc9befbb6c8fb7271766';
        // $billerInfo = \CJS::decrypt($res['response'], $key);
        $billerInfo = \CJS::decrypt($res, $key);
        // dd($billerInfo);
        // Convert XML to JSON
        $xmlObject = simplexml_load_string($billerInfo);
        $jsonData = json_encode($xmlObject);
        $arrayData = json_decode($jsonData, true); // Convert to associative array if needed
        // dd($arrayData);
        return response($arrayData, 200);
       }
        catch (\Exception $e){
            return response()->json([
                'status' => false,
                'message' => "Ip Not Whitelisted Yet."
            ]);
        }
    }
    public function previousRegisteredComplaint(Request $request)
    {
        try{
            $key = '48ECC74C29EB85471E7511C54C0F310A';
            $data = $request->all();
            $xml = $this->arrayToXml($data);
            $billerId = \CJS::encrypt($xml, $key);
            // dd($billerId);
            $url = "https://stgapi.billavenue.com/billpay/extComplaints/track/xml";
            $header = array(
                'Content-Type: application/x-www-form-urlencoded'
            );
            $res = \MyHelper::curl($url, 'POST', $billerId, $header); //response temproarly
            
            // $billerInfo = \CJS::decrypt($res['response'], $key);
            $billerInfo = \CJS::decrypt($res, $key);
            // Convert XML to JSON
            $xmlObject = simplexml_load_string($billerInfo);
            $jsonData = json_encode($xmlObject);
            $arrayData = json_decode($jsonData, true); // Convert to associative array if needed
            // dd($arrayData);
            return response($arrayData, 200);
        }
            catch (\Exception $e){
                return response()->json([
                    'status' => false,
                    'message' => "Ip Not Whitelisted Yet."
                ]);
            }
    }
    public function billValidation(Request $request)
    {
        try{
            $key = '48ECC74C29EB85471E7511C54C0F310A';
            $data = $request->all();
            $xml = $this->arrayToXml($data);
            $billerId = \CJS::encrypt($xml, $key);
            // dd($billerId);
            $url = "https://stgapi.billavenue.com/billpay/extBillValCntrl/billValidationRequest/xml";
            $header = array(
                'Content-Type: application/x-www-form-urlencoded'
            );
            $res = \MyHelper::curl($url, 'POST', $billerId, $header); //response temproarly
            
            // $billerInfo = \CJS::decrypt($res['response'], $key);
            $billerInfo = \CJS::decrypt($res, $key);
            // Convert XML to JSON
            $xmlObject = simplexml_load_string($billerInfo);
            $jsonData = json_encode($xmlObject);
            $arrayData = json_decode($jsonData, true); // Convert to associative array if needed
            // dd($arrayData);
            return response($arrayData, 200);
        }
            catch (\Exception $e){
                return response()->json([
                    'status' => false,
                    'message' => "Ip Not Whitelisted Yet."
                ]);
            }
    }
    private function arrayToXml($data, $rootElement = '<root>', $xml = null)
     {
        if ($xml === null) {
            $xml = new \SimpleXMLElement($rootElement);
        }

        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $this->arrayToXml($value, "<$key/>", $xml->addChild($key));
            } else {
                $xml->addChild(is_numeric($key) ? "item$key" : $key, htmlspecialchars($value));
            }
        }

        return $xml->asXML();
    }



    public function fetch(Request $request)
    {
        // Validate the request
        $data = $request->validate([
            'category' => 'required|string',
            'biller' => 'required|string',
            'customerId' => 'required|string',
            'fieldA' => 'nullable|string',
            'fieldB' => 'nullable|string',
            'fieldC' => 'nullable|string',
            'fieldD' => 'nullable|string',
            'fieldE' => 'nullable|string',
        ]);

        // Simulate bill fetch (replace with actual logic)
        return response()->json([
            'status' => 'success',
            'message' => 'Bill fetched successfully',
            'data' => [
                'biller' => $data['biller'],
                'amount' => rand(100, 999), // fake amount
                'dueDate' => now()->addDays(10)->toDateString()
            ]
        ]);
    }
}
