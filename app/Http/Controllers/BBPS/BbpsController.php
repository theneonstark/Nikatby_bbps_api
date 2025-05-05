<?php

namespace App\Http\Controllers\BBPS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\CJS;
use App\Models\BbpsServices;
use Carbon\Carbon;
use Twilio\Rest\Client;
use Inertia\Inertia;

class BbpsController extends Controller
{
    protected $accessCode = 'AVQU51SS09TR19KLWN';
    public function services(){
        $services = BbpsServices::all()
        ->groupBy('blr_category_name')
        ->keys()
        ->toArray();
        return Inertia::render('Billpay', [
            'services' => $services
        ]);
    }

    public function getAllOperator($category) {
        $decodedCategory = urldecode($category);
        \Log::info('Decoded category: ' . $decodedCategory);
        $services = BbpsServices::where('blr_category_name', $decodedCategory)->get();
        return Inertia::render('CategoryDetail', [
            'category' => $decodedCategory,
            'services' => $services,
        ]);
    }
    
    
    
    // , $biller, $type
    public function billerId(Request $request, $biller)
    {
        $billerNameId = BbpsServices::where('blr_name', $biller)->first();
        try{
            $requestId = \MyHelper::generateRequestId();
            $key = '2940CB60C489CEA1AD49AC96BBDC6310'; //for live bps
            // $key = '48ECC74C29EB85471E7511C54C0F310A';
            $xml = '<?xml version="1.0" encoding="UTF-8"?><billerInfoRequest><billerId>'.$billerNameId->blr_id.'</billerId></billerInfoRequest>';
            $billerId = \CJS::encrypt($xml, $key);
            $url = "https://api.billavenue.com/billpay/extMdmCntrl/mdmRequestNew/xml?accessCode=AVQU51SS09TR19KLWN&requestId=".$requestId."&ver=1.0&instituteId=RP16";
            $header = array(
                'Content-Type: text/plain'
            );
            
            //  $res = \MyHelper::curl($url, 'POST', $billerId, $header);
            
            // dd($res);

            // 121
            //  $res['response'] = 'd1b28012646941dd58185ec704a94818f1f123087515238003ee252a8aebd06b5d6b6dfb06cc2f2a02ee374a23a1764cfd09c9245e058d5d6c2de423365e016cd21d8566ad7c7ee72511cb4aa680f125a12a8e93113daba0212966bce35698db217cac0fb8a8587251d05f9ff64f285ed35fedb93311538583018d93cfa236edc28708658af426e29ec0e18301fc0729436849fe9be6fd6d5732c7f101208fcff67325a65c6e054111eb6665d96b8e72b1ae110035b4bed2921645c043f82ff4bff89daa74de31e36365871e920fda964ec9809915bf8c14b0b4857b66c2c71b61f5d717e993d5ae7bcf0b40bb167572e23ab2da1ea297b4455a3488038834f7cc0c958cb0174eb61fb9731ac5977684553071fbd23f21a108d9438d9e2ff769e1ab8af78aca0440cf317e8d97e2822ce866d8ccc45a906af8a33f8c6537256cea168040b1b3f425363c3c51e9713582205c08b2c739851a052b9a44603510a257aa547fd1325c429f130ed8b18004b09fb152456764e545666739a1620ebb047e8d1209e4778c333a8a5b5fc701d449b88d4d201560cfca349cf76931f373536e48de39f55240224604ca3c7f1fab57690e27a22a458372bc26be610687c8333b5bd494da81698e35d24e690e8984f58e5332a93a45e4072e6ebbb4b6bd2dab8b283f22acbf6c494baf8c9deb7e8a33d97d23e35aea8e337eb11806133f0880e04ecbb2ac766fc3038d790c7c965dfe8cbfaf45e0cd72261816552ca15addaf55585b14b13d89dc809c62801edab66985b5251e3c66ad7c31e78ee83fe3ba62ee72de8f852f9e944dc0331ff5c372aa182925dbb428513e65aed8933a2d75d0d4aab52fa1e167097ab9332aa5c5f9512c714470577f3649924556850e47ab6cd6aa7ff5dd604e15892d0f7d86a8d4de475b3d260cc1932561963ecb259b8933587620e630e48273edc94b4f94b361ea8fe35a2cc38922619b77c9a552e57b995caf07992e299d11a7d23cb8d14e806478671e956176b1a262d1abf51bbee0ce606dc29182b0ca8d94e1fe0f81d10bdb7484c25a3e426407a48d53b888a8a306f53773e511ab7240d8986dbeebabdd3221a24e10bbceb58841577a4f72c2d151f2e03a0ee0e9f50256dbbb9f5b981f5cf5ee6d24d122eaac1e884f8e3e5a50aadfbe927797f0a2b283bc2995d5c43eae3e87057df9be5a945ac5412c65d8bbbb9d44ffa4d5ba762ce38ee9dd643f9cf1a44030f2392a2fd1844511b68e88583ffa57ccad1d70fc82664abb416dcf6dc4f1f97e4d7e0cd6dd4a16f75da863497c3d087b13d9046dc797d1e0b525d6e8c3633006f6e13eb62a16ceaad2abe2cb8c7730cd9b1ad5dc380e62aa786e4cd55f459341682e5916a3639b6d48277a20d40b776973b3a2750f20889ca637dab0f2654abcc1ea531b754d7f9c690d07b64fefc31857dc5ab0b0e02d701b4a53285604d21ba44f9332903a46570464d10c5dba9cb6f94bcf9240d480eddc21329cf3f491adf41577de9997581db36df86a11f99c9e20ef5ff5b57be8d759de430b20448ecaf83afdd56d95087ba0e089b9f233d6dd6aa61645c1648e45cf294f3e56f172edc28114cdddb4892899a5c026adcdc2b58c7d04275b9aaa0b78ccc4968deefbc4c14ffdc1a71a1d65b2eaa6ba7c448eaba88a9562d8ff2c75353df9f745a1e0b36f197b3c19fb81d0ee4e63ea925136db97e72ce36d47673fcae10717f08172a5b1c5f98dd3bf7d4a562170f67b594ad0858229edd737182a7536cee306f147623cb3539d5d03af9a0c504281f46d48f46813c55908e1ae3cd5ac9b89ca23ffb26fee1c68a8257b7d93383c984ae7cdbded54ff18ae3561d4cb30e0aa6bd936ccce02866386cb22c6e08108f5f14c7d9fc92b572fcc8eb1f99545e8a4add36a089330b598c60dba766482bab9e651c3cf9a4821bdc18a59cc8061d62ad64e6bd4fb620fe950fa53a9a085dc23f2cdca84579cee8cf82767b41bd4c32fa55f80d00f8abcec629508e2aca262c2095659c0969a1cc2fba2a4f4180242f1798908428958edb66085466d0724992ee60d8218d8475620624e8226b1204806371b43fdcfcdbee7146d692f7629f38d5f54ef8c259bd7aaf951cd7b3c5df857497598997efa22fc6553ec7187be1f2376d00209b929f7e93ffc9aa9f5e094cc7dd86d3f41b80572629aa419cf5e2eb211004784bd41458c631d0c0e12189931148703d0c5f5fa3b521e6d56f234c833ae0a1039942e979287bb28e7dca0914a42560a99fa8c836b7d6777d505aeac6281081dca0a14a7ee0f574bc6aed3a049737b8f352af9d9ee7342c616e9ff073717bd867ec00015a573e152a2fe1c16a06e429d78ec9650e17187061cc4533521cad04ae068003c64a128b936915e6d9b69ccab80bfe985dddbc72d3ba0b025a0c0aeb5af7e6819622ed4a6d4f9c3e33dcadd01a859c489b7e64f1b233b8a2f3d5f8b0e9580b40e7341eb8aa517a1b568ebf64aa22244ffbf8cf218fe4f8176bd5405df145564a0e2736037ff524dd5d439cc785cd62a1b69d1cdab5c5bbbe14e037e92018cce8cdbce6389d1f02820ea927d34b830aa4cd7c7e772ec7d1ea9ca33694e42170579e04ce45b8f56447bdb19f534594a1f2cfcb73dee49f50df40a37d027b024964352de839719442bb7d5fa24122725724cb924c49189e6ea8100b4785af67a2bd6dfbaa9b977b3c625d41b4afc3a47cb31e44cd99a24067b5282e2ac2970232128d40691978eebd27ab0aeec90bbcd98bb839cc83b97d6112c6d6fecaabab6070b8e49ee1564f86191b5a70388604198d0cccbfa1cf2e1d69f1035c5439ed46703f8fa2bbf5fccba8f574047ddf4444285898d6642ade25cd395633f4808812a8292bc244aaabfe34debd8b72a9036a876ed3abf6d5054c4185d99253bccd0d3ee236bfb8092ead1d5aee5fb08b2b77d21361f63d86562e5ba0bc44d33f17ce0314bd916bc40133192492144171050e3a73143822463b43eb602fd2726431f270e56c04054d8673cf204d1e8296dcf0bda66574da3e37df257399acac5fc0a1c5bef04cb2e4bdc173f4822d7b64115d8c6f1ff8ae3a3813467676be2a1f0c9279ab2e59a8df29926709527193c3c2d6d4f6c43f893b6d7eb1386176ca75853df42d383e6853bf64242aa363d1675d11ff96e20be8fa5afac9a7af63ce38c36095c86e03bc55149632013610be72b89564cb307bf88b063e2356324e5935c551394f581bc35465c0ea1f0bc1a770de72c45c00fc05b41858337ade44973bb64df2a50609f2bba14f12fd86478125f3a11b9e57caca10f7a03e9e5c0bc8ab31e96f5b0f64d961f95aa3dca4064010f52710f4f7f88d2b0ef02dc88c91ab4d28aaa36f773acee6329615564d1d36046c6f009577c569dd65246689b2661a1eb3f63912a5c1be3581b96c5f80e65592ae98af1eb5b8a3fb9a3b5e2486f2a7167b36c3eae99e032a829d8543fa5f1004ffc198016b3fa1ab199f6b1255d7831645361dcec9bbb31e04a96f6e9978d184e82cd929965365719cf9d51fb84318dcb2da762f2872cf3a0dd9b85e6157a60ba2e2b158c68271ec15c127607d2d2d4cdcdeb6cb2971b58f3fa040d925870c100ae6117b9292660ebb34033f04b28daddec9b4bc003cfd38f6755d950fc19b647195491a71ef59142eb29fbc1f2fef8b4b6cd29b87c4f3514eabafe1641fc9ad5e4df979b41616e1c04ca2a513396aeacdc9648e02f4083361968678bc4ebff8cb03be2ea5c8a4a380d63c5d448585fe7eb248077395b873faae86eb9edfbed2337c916a7f33370570b74b028672ca0656eb7107d519f8e7c5f89908a5154d7d95fc53b9c411f3d3c5bc54400af79baa62e2d0735b7230e7bb4d7b6a3826e3f5c77206bc2c42351463f3e1e61484e31d05ef8e6059ebf6ed5b6fe6e13fb02e93beb440036104eaf62ecddd596ec780c1f20dee3f9724d41a000746b400ec81206e0be017403545b83459d55f18683a7e87e5404a6db3ee67ddfe62aa28fc335205e02e3a5aeccac2d580d7e630c88e8420b6e7d227d4dbece2a252c06ab58ab53557077dc5f4a0aa9c7c751c45c753ab1e1fe1baad000abfa117637fbf78318811b370da28de38bd0b7ae04aa70e3795b95f198f37afd0e68d482dd8e8aeb16b226f8ca0a343bc6fd4f5c11f221689e4bb34ddb4bc5eb626be626afb4d316b15c8912abbbde6cd30374b633885d30eac34ad6de0aef9bcbfdb536440aea49b518351bd8cc0a2b5fd252e123385357ffcffd744dc9a20de82466cedf91a04c4e4570dc091944fe0d99bb9ed8ad8ce50a9e56295af3712ba2bd2a35ace436b5d102026a31f341c1551f81364fff84a17afdb20cd4a9fb0b77afec120a7ef3169938602dcca025ff0375fc0c97d00696913441643e2821675540e8d0e97616dab2bb2ebed488f50599b61a6c5f03e93e0627f78949bf27eda5a8a3a7b68ff53beb45f9583aaf024fc65a867ace68b29330fa7a6d2bfe41a82b580265de69270679558e8d7e83e49df1d91179adee9f1fef11d8f30545ed1de034f3aef2db9f177c93e6320e9c8760cdb00f1a0b4fb60de8ecf515ccfa7f91f8b1efa1d808bfc9769f152795f5bafa16df90a52e795c4939c9ab40390568e3b89d94f47a3c79b021d8d8baa0678a369fefb5dadf37b224cb1e50df270693a9321358458abbeb8c0861bdb7899e34713bc90b3fa31f88a515166e40e136b8c5bd7891e9e77e759eb740fdd6814656b5c09f8fa43ad0dcc171ad4c18342430b2f0afccf3bf81418090614b4668a7dc545aad2235588eb1f3d1541caabde5356d4f8f957825bede1261bfbd079d87d6edfd0ff128906861dbfb633fee0717f259c2d82e9019a7e35972f243e6b45afc8847a95c23758fe31ab4412e316aef565214828ff38021faae84544a50c65b85041937682ff3ef2fab19a96199370d625ff112e11f6a838e3f9e8a1a307e745b067e2fa7f387158219405d18266991b2d9d809e1c43617d61e687d4cf7cc38c5ae29d14b4a37a32b8f1601477f9b87ed387883e27f93d9fae776f8ef9549e273efe7308e5dfaed9ff538e238ced70b3b7a22943522411040549975acd79b9ce9f41ebb37123ea2d5a4f0c62fc1099f02a0729a7844bd22330dcbf532f356d08f431d2bef46f0e64159b60577f8d52b0805f8fce51bec7d49f6426262ac74cc6e03796adb4a039542eb5e32b5b9754235bfedfa237875a73ff184a115e6eb838dadaa575a24ce0e45375acbcaac1592987a5566673f62a636ea30790fcdee5bc226a30ca8f4b0feed23623e9dfb25d6cd8a2d90e21e19f9e18b7e219200dee54bb199364ef89669ade338df030d7c02e0432a6f8215c8cefa0f3fc502cbdbc139de60739e634eec1c0290e5af2a78b3985dbddf15df6d43ace8790f0e66f4263e2c0b95f355c93a8f51484a5f4638ce64d1a3e76763278bb4b3945f3b552f9a442ec8f2dab6ec26ab3a6c01062334dd06ac675783ea21953169572152ef6154bb5446efd5557de1efc54caa8ff2475064c8d977fd24ac4d669ffa58e2563371a8e78fa5449045de47d148ee37b8ce00a40066311ab38ed2a66685f8f632cdfd671d16c7d14359a7fdb1dcd44a0c9a854b3eeb7d51455de31a010c3008f0c27cf631db8108edf8f0e1401408bfe9b330f7f32b1762c837c964e510d4206cf7561ec5495afb5112cddd2eb884bf7141057c7db99a0887d9a6c9a93bce4f90db658173249b8eb4a2bc935ef9f35c3237f7d947f37bce46a8f9e788227336ebaa6eb69f02565f45d72837d934b8d94821d899d605ce208a1ff9546989b23a930c9b83f61f027f579effa1b1c6e203d60d8b7054e55994f43918a3e4793439ad2cf35c305b9c0b144bb91eda2f77e80cded4de5381c502b787e1fc06a222b6186c399478ac3f2ba503d22e9187d32523c31aa70acc38938c719c98339c77b96a15ef7005e7be1921c8c9e63d8cee16a53bf9a1b17f71695773979ede72c3c83208cf9598cb3feb04ec4b1bbdf71a3c08ab1d0e1dc8f1b0952b1e4205e274e3857a49e8fb3b2f3582532b939a75793ba8a4388f344cfe1dfcceee0cb172b283430d1897362bcb9141e7f95aadbc23aa8df21382d9b8c53e3e3494f390be38347a88658b038462ab8623317756e3ec5c105da1ca3fa424740362120f9e3c3b96454813332662802538057f3295ab90dc1213a6ee85f25cb7dae59340c9adcc58d317fd00985140bc467877a76e64f1b4422b85a76d2b71c366611d26a8b4424ed05c80e35a209ac444be6d0d1604e2480439123750be92375c6d0cd8593869c92a5cf94ed0e5a7b27418910c8af06a5c1cd7725b6a728737a0dcdf67e14f8efb651c459cc0a97441ba267a6553f9f574e0ee1f15c15a8d142d48a502060fa9538b85a576595fa58e50b3b1f6a64ac72307410861357a3efcc644b1db1f266513dbb206830d3ba0ddeb1385c2550abf92e9e230f95f23e7406c9aa949f0540a9934cb24f6f148dbbc45ec48030ad939ea17866fbd1d5796df0428db9f0aafb86e0236b13bc6d80676fe110baaffa6781864965b01b64adcd0d466db242fb197d57502fdbe574385fdb7ce390bf1919c901e9c68c955ab76b30541f8dd1127b61df33024681b648147a3fd3405';
            

            // Aditya
            $res['response'] = "d1b28012646941dd58185ec704a94818f1f123087515238003ee252a8aebd06b5d6b6dfb06cc2f2a02ee374a23a1764cfd09c9245e058d5d6c2de423365e016cd21d8566ad7c7ee72511cb4aa680f125a12a8e93113daba0212966bce35698db217cac0fb8a8587251d05f9ff64f285ed35fedb93311538583018d93cfa236edc28708658af426e29ec0e18301fc07297d66c72afc018c18a9519acb7b6db61ac282fb6bc03027dd9ca603deaa482de089b6f7b625b945a81b0bad3f7dbf951c41dd5eac2016c1b67d7aef88681ed77fc304740f217fca2852462ecf55c17e2e7ff165d1557a55c357e4ecf4b25e653211d6eb6c7f5ff6927b88cf4462983c2e6b91f2ed1f1f62b94c9c9444871fdda3a67bc14cbb358a5be805ebda25f5c30186c24778d9df48828e25f8795f9c4de73ce608d4b3fe0ef7101de14519c24d1c7eeff1b3f4afb7d3fc3b4dad2c49d82371270f203a1a5f13da80187df6ade459ddec7514c3824702e501449184fef92a879a1f0e94b123316b511cd41d02c35f2b577e7726ee9828ca2b9b0cb93b8f1dfc223e96cbe5704f545d9df11a9cada69ddaf271d4e6a400842b2f52c939e3e59d34dcb54d0d17bd055f3235c1692afadb06068cc89287f9f087d7d8bc0457a209d5a6bb7cf3d422da25295f111db4e4fa61461370b382372cc136bb093303c0cb4c3e29cfe38b24cd01c73a350eff9a37d6ea4ffefea47bb9f406827828d48f16fb59a2f2747308f980ee0d4481a18ad1439ce271e808417da72ac14b083de90a1192e0855d3ce2e61f0907016e96da25c36a68c89b9c44b54890d2928640fd11f2ca97f61d6805bb53eef6ab04194e4e147de86343db5586a9fc3cff2addd42107f2ee8e21ae7e8a085410aa0a7a16242689e4950c60484812a91aac663da0b4f2f19bbfff4e70e834dce467bfef57e24f919d82a9ea5f789680163525e98915a116945130bf92d043265ba062f6f90a51becfac9870eae915adef15bb34aeaa494afe4b577719c196ce8bd14115104aaf7d2272eb0123091ea589e86c30410822b40ad1ebccc9820062cfc8c9a36d996761cd6af767736b28ed63d969f3ab4324e3e8aa2d819d792b2587490438dc0d31fbeaec2175461e42bfbc9da520e92b905fbc30a7c4f57ea81f76d4937769e4bcc78eba95835de308b56e921d24864860f10ba13cafd580c88f52521a5f9916fb2f949b362681a81700a9eed852f0290b62f909eaf569bb232b547a65aae5f66b20c96fc70982f819e345f1462046e3be9fde06acbd7491396785596a13743903d9f6ccfcf0d829e033669dc73e35b766830a30002291dc2a672172db54ce652a2daea9dd09e0ff15e48c603e14bf9f7100e8ea8ceb4fae638e335eb05eabc662bd36b553e759fc150a8d89e1ca290586bf6f571146cc20f025bb66584ea2d634e54a7832b5beacb196de7124a61d8afcb4d31b5f9d441554654c925754d25a3cc043c70ccea06f1bfe88d397d3b2f4e48a69c49ac4694e4ac1a72224f52a49a3e6b6bcf426c35c406f74a8bf4132c96a1181004a02da6a7b3ec1a06596f78dae6e340c3c1753b1acd311b24203a65798e8cf1448ae8604663764e3786a058f48dec61f493b7b559a2a94f40edf2c3c39e0bd4e451d510ffbed77bdf830c003fb0aa0c25c4fa736ba574144b898500a2c9a58b89d701b41cd5ff8221e5ceee5105e7e2fd8fb6813d1a079ace6fa64011992d9fcb0aedace7510671a4164fbe436c295f4b46a2eaa83999451f75f3a5f8830350fd68ccf1dc34beb98061d9fb9284028bb07a100ca9ef58faead1729bd5386c197b4089b2272b71d3c46997bb67a6166fd63f69d25c4380ec20d88e99196a9a4e42b4b0b761481c9c50472451d5c93db49a2d4c7932e99418e4180eca21d9978ded8133e7ba447256984fe79a424aa97028cac04da301c42e3cd400eaca6d028d1930c3ab50a9283f110bd72a83cfc3fa59c03f0e7ed7151497507fbdcf3f884311e7d6f20b2d44176e147c3813b4def8d164b7f9eb53eb3babb3734e4bef28801a05006848c4a26320bbc1622a6ec4fe4e12b5b532946612dda2c0968991861c1a9ed0ee949b3608f07d41ccfb82a03384a8a3a850a41dd1889c81cb7481c312c6b32f20ca7b16393094fd4b010cd5bd5b95a98329f416bebc765a444b9a671b8194a4b5e869940693823bed5fd2cbcd124045b322c81abccbdc2b3b3fa87e200de74683ceea848436c4332ca4dedbf016085c5e31cab09353db3f69e739d5a01274e1ed236da786a41b11748b3800846fb04c738b36b4052da72f38abc38f41e8c75c4dbcb7d1725a123003bd8a798a78ef5e506980e806daf619abe47f99a04b4e6199767410b5e6300b2b416a1118d6acb05d050c7cae88780526fb4ceae9d176ccc61681333e4d3fcb64c54d6c0888bb1c4159d6733faabb908f34c999e2733b693e215e75bed093759435c69c56867b2d70391aae002a21414417a97b6d8313c3517c3189018365eaaa28208e6aad663a602193d3f5e1a406aa4a40ca3f4887d4ffb990ea81e3e4fcc7e52d1a2ad401d1f5b5532c382a54b82238e62a5444fb10188fdf0d671ff7e89698bb2c32f66bc9f3217c46f7b4fc7002da44a17f7e4ab83b0ca6de592e9812bbf257289b06b1985d3181ecfb774cdaad1a6791fb5ff51f518e9cb9c27e1fc295833b01dcc4ca2deb0ead8626f30ed462e852df663db5c37afe44cf0ad22db3078675dfc0bdef1ecef506a874feb237f0a7ffe4d75c4f7bf0e59555039c2f04b8392b8b7396f0df6d9c0b18eccf9933cb64a9e9a877b04c69603a32de759d71224756831762cce8a9ed0049f07d9ab783428ae096915e6756ec6488789095c15759f976d2444278ae01e1e1f7d3e1d368fffba363220c4dc2dc47e257ba9d4b456b323a74eca86d273c49060f3c0fba55b7dda4bcea05c8eaf1ae18eedb4643e3a5952015df569b06c01840d3239df10c15e93b03c56fa461b5be41a8311682331397e828ec78850049d19079a03d4db88f94a508acec91b27af545539742e47e62059720b8cfce091643760ad7eb3a7a8287e0ce32704a58ab73dfce960f9d66108a09a4ce74b6b42330811632a7ccd54a6aa7dfcffe07ad684127fd4753033c5aacf96a4473b6ef27d9187bbb6e8fa24b1c1f38eebe7a1bb96c1e322e7e1c68e218da5207f354a028efeeb2d2853cd55db039373bc27f8d58ff5fc5366f5efc48f93da1c2fa4e87f9533cc2c6d18307f74ff6cda8996176321c69893f9297076e02a9427d41b117bbe7d802cf1c3289e335f9d8f449c02a565812f912ced6df4dc72dc5b1440d36091f1f8a00c8ea8333938105e588b995edfd36a0dd001f2bca5a5f66a671c5662c03ff92d218382ecd3758f2ab88467debd672331a091989d4d702f1eea3fe8176d626281cdaa3c1392f7cdbc80f0c1040c292c196aa2aa6df5f59e290dd2d12c04ff75a980dc8bfd105b0f7055089cabded9d34121cc15da0a2ec4da925eb7090ad671003f1166c265a8631f6a78c1520418f3b8cf9db2d25d29662853295461ade9eb1d16b748819ed0a69161eafd1031723eef90a60a4f0f577e8b8c9ce1af427d41697c3e8d6c56ae68d4695005bc43824b4c8f66123d42b28eb2e483acc35a2b5e0c8c7223595dda84c9b66f7266bcbd1ecb13b0fa56b7acdbca23be14a546e13a9b137fc305aa1466a05ccdb5e2272c5a76fe77d9c1965e38e8d804b6bc410ed3676048fb57a2bdfaa27c10807e314d1cb360799f0da9b3ba1a6cefb8ba019a49bcaf9f738b91a0a8ade77dbab99257dc2b79a1dc21ed611cf501bd0c8d44ea3838c20b5f7df9583e21c83e787c4b17aa681febfa712d03a8b2c70402935cad2740c389c16bf86429a924252afddf34fa60f66f1e3856308aa6bb448531f4ec82b96f75109925f337582ac6b34c6e262dce25a5754cd153d7f353609d6fdff3ffaa70a1a3b2be5501ff3cedc33ad47a103366b6c19fe79f0c8a7024b35495741aa1152143b34b18cee225ceeddd4f580c0c5cdc6b95c3ae4786d0e30e57cfa427a0217ef20b2aedda4f87481e66fa67f5db20942aace38c56939552f3a85eeaf528441ecb584cba6df6901c89949e41158d15c1b9712ef43584536113ccc1fcd9f2f444047be6bfaaa6ea9d7eb702b9f6a09942901609ce31d7969023950caec0a75db502a3663a65b892939a4610e6273133c5455a496c2ec801670397b1881a38f23cc2eaa84a086fe1d33edb3aa35fcd876c6c0ee3f8f1fba19fd74f5ba28c1cee1409420b79324e8f85bdd924d3b2aed208609ba0ca922d4458da6af23e658cc2145741379fcf18cb7e7e0fc3c013f1b13dd2404d7dea2ead652948541941d8342b8ca7b3195e84644f2f85e81ab238e266a745d6b47d95ccfec7bd3cefc420e925e7a55a2f5dbfea234fed83b30f033524522d9856655c617555c46b06ae7495f45ebf1af63c0e964a268c4d65f81db6e169f56b117607a14fd49650dc6dbbebd3a9896f459a018e60312b1cb7e8c4937f17554e1375a674da821bfb76f6ac068d12d9bc14db1b79acef16509bec0ad1e106435726f98af03561b07a11cb98bd3a91b5b2964d333ab948093c16040715e2d95905ee509eb75c2217af41e3bbcfc221d902fde77925661955fdf2683658e39f50f5bb199e7f3ec584ffb913278940ce2f47cf504d3b1d69bf81aa667ff90fddbf6815fcb7f939123d9d37f503440888d1ea8bc6c794252558cdf54ef6fef0075507ae0d2caea230bbcc74f1a46b8f30dd36b48478f1cd7bd076442e42332636173338ac84fa39623f2e8fce3abdc8b9ace8f557b61529f65b4926dd07ff647885e1d2ee1384d761c7845465ef49cf16dcdf44a886bcebc542c9a8edbd9717c1f48c860fb91a850fe85b8b6b7142fbc0c3967b71100c4b9886164ae3e4b9d2aa45be5333bd04246c6bcbcca3f7c0a23170fe5bbf9e5854fa90e74541bd6aedfef928008486c2699c6cbfafcec0098ad67c237049aac97ad5674d824ddbdf20f8ef4e1c06869870380594715467c46d6609b2ff48396ab9cced3d316c5316223df9c07a47b3dc28c2a110119e2f870798c64573e6fdcd2e09845d0d171dd418058322ee89aa6ce13859c861dc030f7e35a2e7d8c87fca9e6e1399866b14b2f2711c5d3745451fd8196712d6a7ea74aa1380d84944c820607087b34713bf9409dd4d3dd4ed4e6ea1f1687f0019367e1322ba5d3970ab6cc2500c33c2fa6c5bf3bf01dc6ae78127f26807e6dd486cb0e63e354deae586e3e9c3841206b59ddeb4c5b05a78c0730c4819e5e320a9f22fcababa9f4a2d9ee5157828a61e0a8b97095e4f290fb5155f1ff91b8a299889266130c9cef271a0f7513be39e88a09cbc3ed78b32faf243694ea85c76ce5ae4dcf4f041f94744deec68b487b13dfbc474f77b4fead4a6f933a324e5a63a021007cacc742021fd313d4cd39a88cbb95e502fc9f31d9fa7fe642718c4e71f3d1c0b46b50d5bdf18ac71578bc20c37317ba26f597e10e637fb988621c22a1236abb0d9480e73fb73a8f2596ae3f35888028a6abf1c77e2a96aa7daaf31079641c8bafbbe55534605cf61fbcfdcff90ee3ac88698a488287307f269d9519e3279e5236e13b17eaebf59db38c8fbd6d575dad8120f512af0a3255cccf391fe512590d9aac02bade75fb872cc8210e20f49a375df164e8b20a241b00a72b0d9c16ee3e370d5ec197a6ed3d16e4371e503f88944abc5aa914b41ae0c863124dbfab64ea4c7e449b6702f93cb8ab5fab4078e4667dbfd5a7d3366f8415e925f6a990237117ef7d0cc8bcb5e87ccf013ed5761b731b2fd9ea85963efabf7acbd1035b91f57f133cea2d8da3dcab245d1b7d757ac53a4562385c6ec83fb598bdf5b4031d9ab255e2a25602d5faa282bb51f8eb7ae7fee5fc9ab2fdcd4f3394006236527492d8d64b0dc5f4ffd9cabc80a02f4ebd11b7d6e6033213ea5a2e65c283e0a8501aa2e229f5bf59d49ad5e357986b4ceb95b339761eea37eb9165022f6a185506bbee8b97a650c777a05fc3aa741b42b0a0d40e46872248cefe025aaa111a02e9b7b4b4f0e91b9bf66213ac0a791f60e08145b95ff37b9742b74c1eb53c763436ad52a8b0bf109d92b0b2fb55eb03e04c32d0db872c47297c68edec32a27f0c01d7fa8dc2ba08b0cc201dda1f6f6be759c602ea709ddde270e9cc897a43aa7513120c23219e2803e86b0a85d4c72093934dd182b26af9703c4aab759205a1cfc8917bc0f70a5766876a020c36660685debe16bade292663db057fd6e980f2dbdbfcd135c395456b7b6084d1fae356ace238c8a5cb8e9d85c288ea5603cb63a4a05e34d41e4160b1bb200c09dc2cf86698b998ed884a94d87614205d188f99bda3df78e21f6cb888b68c7e127c5bc215ded748588db9225e4a639941c23de7a3fc4fcb1c506aea7ebecc5af42d1e0536f9ba8abfba0c29fe546e9732ccb2010f6e16c034b0b9259ac66e39439a02f91ede28d03e29abd4e9225be5a01982275a0155682eaf4f495873a89109d939fa3a7580246747b9c83579db42166564addb733c352fa4ad82bdba66d3913731056b073ff3a8fb8feb9438b754785d10a825a82e054dc9fd33ac4fbcafd8069fe7686ec0fb763deb342f8dbab05ae3dd3b4e128f65b33b4902b0ecddfbc067abf937faca44fc3e2962dafad94bdf207ca1e9bdb758955e40f285312dc96c6b877582397faf3836d3b14676c6faf74d7e5c364d9a3a679e42c277fe4cf7876b61f7fc0c06e65ed93048775d12e47f564ff85dee986f0ad475ea9cfa7a87f72cabbd2fa3e17747464ded192f7a1d5b571b587dec6f24e179e2bface292d8742445130430d894b72c6707f5225485bda7530fbfa50870d2815aa32cddb7adba88be97d4f1bec49e68930ee8a5586c8c7b5b12c1d9bbd0fccc39db6f8ba6d0600b1fd03e88cb1238215ce402b5c8e673f91f38e7df9e222034a526b79c8817b2cbc3aa0d84d76369531eac043948644be37219b9557c9208650dfecd82fef000ddf3ff0eac1b8cc68532c092e0c4200d645efa21ccabd02090349323ab1659c3e507f348b5e922790cb065a9cdb3cbe5e275aa98ea57cc0a62dacb977e719678ada54f3d600f37529ad941ab60915f43867b24c0c7041bd15";

            //  dd($res['response'], $key);
            //  dd('hgygg');
             $billerInfo = \CJS::decrypt($res['response'], $key);
            //  dd($billerInfo);
            //  dd($billerInfo);
             // Convert XML to JSON
             $xmlObject = simplexml_load_string($billerInfo);
             $jsonData = json_encode($xmlObject);
             $arrayData = json_decode($jsonData, true); // Convert to associative array if needed
            //  dd($arrayData['billerId']);
            //  dd($arrayData['agentId']);
            // dd($arrayData['biller']['billerId']);
            // $InputBillName = $arrayData['biller']['billerInputParams']['paramInfo']['paramName'];
            // $billerId = $arrayData['biller']['billerId'];
            // $min = $arrayData['biller']['billerInputParams']['paramInfo']['minLength'];
            // $max = $arrayData['biller']['billerInputParams']['paramInfo']['maxLength'];
            // dd($arrayData['inputParams']['input']);
            return Inertia::render('AllBillFetch/ProceedtofetchBill', ['data' => $arrayData['biller']]);
            //  return response($arrayData, 200);
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
        // $billerId = $request->input('billerId');
        //  $params = $request->except('billerId');
        // dd($request->all());
        // dd($request->input('billerId'));
        $request->validate([
            'inputField' => [
                'required',
                'min:8',
                'max:35',
                'regex:/^[A-Za-z0-9@\s\-]{8,35}$/'
            ]
        ]); 
        try{
        // $feildName = $request->input('feildName');
        // $billerId =$request->input('billerId');
        $key = '2940CB60C489CEA1AD49AC96BBDC6310';

        $url = 'https://api.billavenue.com/billpay/extBillCntrl/billFetchRequest/xml';
        $data = $request->all();
        dd($data['billerId']);
        // dd($data['inputField']);
        // dd(count($data));
        // dd($data['inputField']);
        // $agentId = $data['agentId'];
        // CC01CC01513515340681
        //format

        

        $xml = '<?xml version="1.0" encoding="UTF-8"?><billFetchRequest><agentId>121F00000NAT4D</agentId><agentDeviceInfo><ip>124.123.183.137</ip><initChannel>AGT</initChannel><mac>01-23-45-67-89-ab</mac></agentDeviceInfo><customerInfo><customerMobile>9898990084</customerMobile><customerEmail/><customerAdhaar/><customerPan/></customerInfo><billerId>'.$data['billerId'].'</billerId><inputParams><input><paramName>'.$data['feildName'].'</paramName><paramValue>'.$data['inputField'].'</paramValue></input></inputParams></billFetchRequest>';
        // dd($xml);

        // while ($a <= 10) {
        //     # code...   
        // }
        // $a = '<inputParams>'. $bc .'</inputParams>';

        $encRequest = \CJS::encrypt($xml, $key);
        // dd($encRequest);

        $parameter = [
            'accessCode' => 'AVQU51SS09TR19KLWN',
            'requestId' => \MyHelper::generateRequestId(),
            'ver' => '1.0',
            'instituteId' => 'RP16',
            'encRequest' => $encRequest,
        ];
        // dd($parameter);

        $header = array(
            'Content-Type: application/x-www-form-urlencoded'
        );
        

        $res = \MyHelper::curl($url, "POST", $parameter, $header, 'no'); 
        // dd($res);
        // $res['response'] = "bf2d0561c5593084bbe58efc63d7996278c29d503fdda62888f19afe0e8152594170605746b1f12226fb6441948ffbabb11a683ec1dd63e21c175f325f3748e80f809c5d139f8b4b6f57392f5c4f358311474bbb8e64ba1da72e0fc38779e66b5516866c17ad3df8db862e851758baec4b33c4b312851c06ab30fa87bb78765ba2714524a8444f3e8c297dbf84fc10d33fb4c355a6d12fed90e21eadd76e1f22cc95914d8d748fc9a41f3864ea12cbfb67f4a758a3c57452755edf9cbb49cd15797dabb546adc04d2a62d0a1474a740d1340d9dd01805b4832fbe3eaca0bd304cf7f6b3452403e8b5ffb0237bf88b7a5fd69b7631039c2ce61da91df82bd185409941edd2f0d5579cc819aee45936ddb68395b1f5d5a072046166f30b8e3cdde1d575d7209ab3fdf2157b9bfef86279234652654a7af7239dc6942156afeff9df493bcb1c9e7b79829265ef6295b553b0a7013cf68859f17dfa0ba75cf484412ac983379c26ad98b993f61d959488bcd53acf4df097b51bcba1cec58541c6165b46d0e679ef0ddfec4315419811ec5f367212746091e630f257457bfdfec9f35052843e155c02a64909b98376bcaf81af242feccb8ba4716bf9f094b752a0dfe92faefe51d9abca4ef40b04c40d2ac905fd80da442c0d51314228e67d86cee9dcede1f6d9f424cfa9bd5f400afdc9d5962e78f2ab41acca261b93e3204d325b0593c151eb97094784faf1579117741d3cf6a89b388f02b28a0853260700d0d1ebe5d697de49b9fa0719f87d145ff1f2b7e6230e27329ea17c0c0d66af9da249fe20b6b049a95e89cc7aec16ff7e2c1c8ecbf2ba2c83bd0b554c746e8b50b4d37720cb84d115ded71ea953d9743e452ea88c453b624735c3067d28343fd675cb454cc48f4a3003267df644599209e978c2fccc5dc8bdfb3388eaf535a3e7b803144cee46a29b755abcdbafb81bc26616a60a8991559edd0130f4620652ae9dac3aade4608566678f81f2cec5a1b56ac979e1bfde0e70a819229c1031664c2a12058666ceec20e13e5b7eab1565b758f58c6c3bc72e27b3e5016918b94018ac64f544bc98af6989bbb47db2ce4b4bf6bd6f805d2de83a4865da43d37b4b20937ed876995802d2a9e97b186cf8c63e9e75f03b230966ff20b0999c78c0cc580fdbbe034438ae05f722a432c9b7759e563dab1e33b8b6c467c3cbcd4fbadaa58dcef7140ddc4c531c14a8e7f93ca9c0e5ddc841788aa08fa90fedea88a47a3fda9e02f2a7a249bd53fbb9538335072232dc4060abba833e2735a92db66f13b8581daaf112d1b514db738949918cb25749cff71884bab46512c78af20420b5122da2381e940ee330940b62183454e10bc92f7f50e1900e3714905d27d73c02a8542981f4a22580b27358ce7c6898f769c316414e81e88ccf11a1e2b940a0cba7a049258c410167c277095e148d6a104abf4a2e6a13471f49521993a282bede1ad62418ce5e08910c82477f70bc8550bde048773df8819c4df9761ffef21fe8618aa1d28405f27a6a5b6d57b6fd2bd460a300e64e2a6680b79511ba49b70f03c9648162dbeb16c4861a6198b5ce73308dafb1f8ce5b555f6543232355d39a3a0dc1d2c36902c752c120300c5e4c1d3415078cfac3964a62c3b2e23924425f9e6c2986414b3fd77e353ad136876f0b3a80a3cf0d7ccd3a63ad94b4b7051ae260f8223f239d2e2b67a7cedc96f52ea869470eaa38a852a587f841b5b4c30788e9e53f4f1c817a3d89f877abba3bd66562d06285efe84ae3d211d74bc131126923680ece26e714b974843d1d07372e59aad8b9246";
        // $res['response'] = 'd1b28012646941dd58185ec704a94818f1f123087515238003ee252a8aebd06b5d6b6dfb06cc2f2a02ee374a23a1764c1a869dcca03baad59e178d68114572cf9df93f9c9e1fee3cf78f1a0d64c3e959401f336ee318257205b86fcf1ac804be8ca1ba8ea5d238eb3438dc06e93101046bdf59895d8c6e1d2a23b112c7b605ff69f4c93a273ff4b5fedc47a010d3fda88ada4e1792e6c78f1bdbd21af7764422a40906d191141245afbf50a8a9d795d112b60f5b3b3169eaea45c51117db9ed3cba59eaabc46a89ad465b9747d3ef02aeb7cf2d985ec26bd47636fb9044fc6d949777e1b12d256e73e8f3ced8a48b004dd57909d88de38b96e1284c926740d38';

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
        dd($arrayData);
        
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
        
        //  response($fetchdata, 200);
       }
       catch (\Exception $e){
        return response()->json([
            'status' => false,
            'message' => "Ip Not Whitelisted Yet."
        ]);
       }
    }
    public function fetchBillDetails()
    {
        return Inertia::render('Billfetch');
    }

    public function paybill(Request $request)
    {
        try{
        $key = '2940CB60C489CEA1AD49AC96BBDC6310';
        $url = 'https://api.billavenue.com/billpay/extBillPayCntrl/billPayRequest/xml';
        $data = $request->all();
        $xml = '<?xml version="1.0" encoding="UTF-8"?><billPaymentRequest><agentId>CC01CC01513515340681</agentId><billerAdhoc>true</billerAdhoc><agentDeviceInfo><ip>103.250.165.8</ip><initChannel>AGT</initChannel><mac>01-23-45-67-89-ab</mac></agentDeviceInfo><customerInfo><customerMobile>9898990084</customerMobile><customerEmail></customerEmail><customerAdhaar></customerAdhaar><customerPan></customerPan></customerInfo><billerId>OTME00005XXZ43</billerId><inputParams><input><paramName>a</paramName><paramValue>10</paramValue></input><input><paramName>a b</paramName><paramValue>20</paramValue></input><input><paramName>a b c</paramName><paramValue>30</paramValue></input><input><paramName>a b c d</paramName><paramValue>40</paramValue></input><input><paramName>a b c d e</paramName><paramValue>50</paramValue></input></inputParams><billerResponse><billAmount>100000</billAmount><billDate>2015-06-14</billDate><billNumber>12303</billNumber><billPeriod>june</billPeriod><customerName>BBPS</customerName><dueDate>2015-06-20</dueDate><amountOptions><option><amountName>Late Payment Fee</amountName><amountValue>40</amountValue></option><option><amountName>Fixed Charges</amountName><amountValue>50</amountValue></option><option><amountName>Additional Charges</amountName><amountValue>60</amountValue></option></amountOptions></billerResponse><additionalInfo><info><infoName>a</infoName><infoValue>10</infoValue></info><info><infoName>a b</infoName><infoValue>20</infoValue></info><info><infoName>a b c</infoName><infoValue>30</infoValue></info><info><infoName>a b c d</infoName><infoValue>40</infoValue></info></additionalInfo><amountInfo><amount>100000</amount><currency>356</currency><custConvFee>0</custConvFee><amountTags></amountTags></amountInfo><paymentMethod><paymentMode>Cash</paymentMode><quickPay>N</quickPay><splitPay>N</splitPay></paymentMethod><paymentInfo><info><infoName>Remarks</infoName><infoValue>2</infoValue></info></paymentInfo></billPaymentRequest>';

        $encRequest = \CJS::encrypt($xml, $key);
        $parameter = [
            'accessCode' => 'AVQU51SS09TR19KLWN',
            'requestId' => \MyHelper::generateRequestId(),
            'ver' => '1.0',
            'instituteId' => 'RP16',
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
        $arrayData = json_decode($jsonData, true);
        // return Inertia::render('Billcheck', [
        //     'bills' => 'Hiralal',
        // ]); // Convert to associative array if needed
        return response()->json([
            'dat' => Carbon::now(),
            'data' => $arrayData
        ], 200);
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
        dd($request->all());
        try{
        $key = "48ECC74C29EB85471E7511C54C0F310A";
        if(isset($request->mobile))
        {
            $xml = '<?xml version="1.0" encoding="UTF-8"?><transactionStatusReq><trackType>MOBILE_NO</trackType><trackValue>9876543210</trackValue><fromDate>2016-09-02</fromDate><toDate>2016-09-06</toDate></transactionStatusReq>';
        }
        else{
            $xml = '<?xml version="1.0" encoding="UTF-8"?><transactionStatusReq><trackType>TRANS_REF_ID</trackType><trackValue>CC013194BAAE00044817</trackValue></transactionStatusReq>';
        }
        // $xml = 'bf2d0561c5593084bbe58efc63d7996278c29d503fdda62888f19afe0e8152594170605746b1f12226fb6441948ffbabe6fe3e7c47c11ebf64a79167340dc950dd7a10a0bcc759578e10dfc28023b5e1ad2a078ad52ef53b77859f7f17a6bbd7612f09ac311b5daba73248ae3129ddc8dcf5c004aab55544a98a0862f0cf50c8a014e1ff8b71ce1a3f0b6489c96328641d19cfd405ed993c114efd700550419e18df4d04cdc5805a578485f9fe304ee2d66741053082b1465006e645fc4c3b69808e69bcefef66d24ec574a312327177c2047afbe226c1cc328e3114bf353bddd4e6ef71692d4eb815a8501e9a54139f395f12d1e248935e573188b4b8a35de0a3b3a750b26a5c0b88691922b8079bcc2da25e9d3439dea7b494bdb7e38da8decbe584fcddcab91298493351f3d876fced03a7aea9d7b780c5a9edcf1b557d90aad0d91ed74a82f93c10e90ce0e41bf6281d1157a1a4a97851f93fef2b9e0de82e289f5bfe7764d900ddf1de701855462e6c463e30520ad9f0732fedd9cbbed031e0dcd1d4d837490907473bebf34a49e2ce4b7e9320b4ed9a1ca5896cde547a879f1d5744cae1ae2219231058abd32a78b9a9a5a6946333d39d94696b4edb05a03c02552726980e575afaa1f5b51138c67ccb94453afb6a5a372116e6784b49586984dd165e2d94097b963cc84a4429f590b69d62e6420962a981c366e4f5d5ecf375ac2cc64b73003313227a773853234f0a7f3accd6901ae09a143c8387eb1382fabaec239464d1d6a21ca21fe89a2e7fcbf99ea20bbcb01c12157164b3c51af1b626f874587d81be103e651d681c60f0eca24276d4a34844e68158970009771932bd56352fc77d125c5c788b5215f583fec2399f56c7ac0b421c214386b9c3f41faccf96f3b9b398b0d9619ded54e9414c83a3a382f6e24115c71176e0ef480faacb36a9d560ae3192e1ed09a46ff6d28415d3fcab1936babf7fbfaa10fa3ef06d955f91257803bd73408af4ddffecfc2f9d8d7b55d0aa4b80501081f7518955ddefa71d36b95d83d6696d5e00cb4dc715611d9f33659677b5a7bdee6a967cb24492d12822abbb9b23373412aafbadae6b1372b4b0cc80d1dba501c13e30d8d4b95f5b5f1c2066440d98829718c881b44ba6655e1441de17eb8309d40ac29f9e981fd27c0f2fdb887e30f3c00ad05390403dfe1c8d655cbc3797c1c981f09823baee346287a4b339b89a2ee45aceb656417c4138057e5be2a08de4599cc01e8010b9f73ae68406fba33adfa62d09c3b96f828cc5e1ba39369c21430f8a5741a0e0199b51faf6945abf3ea258c8671b5da2085e78b15bf1afd7473d691756367241c538d8dffa2a0c8c50f0db044b898b971ee278a033fb7f64270919a168935cfcd6884292e5cea325d5be7d0662c6c4fb809cb60ff32e69ae2567cd172a3bfe701ee2524388a0f5e0885c749b1d61fd160a3e8867953bcfc240b11fd769a0ed3d65aebc0c20b3a75571d2ec0bec8344d1381bd63af46fef5e7652f8907008f4144423b0bc3f36397841003545d3951ef0cd3e04f9e60edace9f4659332a05db1cccde7b296f320c271b0262ac0b6e36ad1b05f855b245c3c2931a923e00ca23b87bf05b7110aade25f26837764f1cc1789318c33e56cd3ae13ae8cc2b8c2292288bf0fc70403cbd757ccb8749d7a2eaed6ca975dc25cd0aeb0c22f4414276dcd6783cbc5a71145dac00aa07f936c9cdb0e0d79d0696be6616be76bc88b4fecdda62571251060ba8977c4a62b250a4c2c76e2ab9a39440ed12c8f1ccee7141c9d860feee757c4e19757d0f724a4d2891988c61cbf09c225c71968f507c19305d0575df99fad6f1a25e2a5a10f6ef4fd1e5bb925713c0c6bc145481bf8467de0d83dfeeb0e2aca7c09f2339ed27538c492c5967166970716da4680793f70743140b47d7e156be118e15cc459a7ffa958c4be66bb004fe39debc1546834d9eafefa5bc0b2b9a498158ba194dc5c71ddfe5c7329424d0eaf162c2b470153cd9258b82d817d08e2d3b7cced42f5a9de2a2e116096a9bb7d2f821ac71e172d6c31e5e427879a48e1ec3df62db74bf041eb496c656369a0285888c5a3d0ae2f50e2fe73f4a36758a59501dc933a75ac2d9c856f1530a7a73f3fa2de58e6f748c11bf4bd31c63f1c8d9e6391640be42a4fa69ab1fcb3f9637bb6c010cf0ec9719a8ead4fc7aa53f6679d63c18143fe4c3d73b27a52faf0e2037e81ba8bcba2ad76d45a5543c81feb13467b3c4912e683bc05f7b9c067abaf99a3a6e1e1525eac7a48e39bbb9d7094f276901c605814b0a42';
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
        // dd($request->all());
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
        dd($request->all());
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

    public function successfulTransactionsSms()
    {
        $date = Carbon::now()->toDateString();
        $time = Carbon::now()->toTimeString();
        $transactionId = \MyHelper::generateTransactionId();
        $sid = getenv("TWILIO_SID");
        $token = getenv("TWILIO_TOKEN");
        $sendernumber = getenv('TWILIO_PHONE');
        $receverMobileNo = "+91 62037 28749";
        $paidForMobileNo = "6203728749";
        $billFor = "1500";
        $twilio = new Client($sid, $token);
        // dd('fhvdsf');  
        $message = $twilio->messages->create($receverMobileNo, ["body" => "Dear Customer Adani Electric-Mumbai, bill for $billFor is paid for Mob No $paidForMobileNo keep " . "$transactionId" . " on" . " $date at $time for your reference.", "from" => $sendernumber]);
        if (isset($message)) {
            dd("Sent Message Successfuly.");
        }
        dd('Not sent');
    }

    public function complaintRegistrationSms()
    {
        $receverMobileNo = "+91 62037 28749";
        $transactionId = \MyHelper::generateTransactionId();
        $ComplaintId = \MyHelper::generateComplaintId();
        $sid = getenv("TWILIO_SID");
        $token = getenv("TWILIO_TOKEN");
        $sendernumber = getenv('TWILIO_PHONE');
        $twilio = new Client($sid, $token);

        $message = $twilio->messages->create($receverMobileNo, ["body" => "Dear Customer your complaint has been registered successfully for Txn Ref ID:$transactionId and your complaint ID is" . " $ComplaintId." . " You can track status of your complaint using your complaint ID.", "from" => $sendernumber]);
        if (isset($message)) {
            dd("Sent Message Successfuly.");
        }
        dd('Not sent');
    }
}
