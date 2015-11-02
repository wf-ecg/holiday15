/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10
 */

define(function () {
    'use strict';

    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Data = W.Data || {};

    function ranMax(max, min) {
        min = min || 0;
        max = max - min; // essential range
        max = Math.floor(Math.random() * max);
        return max + min; // restore floor
    }

    function ranDex(arr) {
        return arr[ ranMax(arr.length) ];
    }
    function takeAnagram(arr) {
        var idx = ranMax(arr.length, 1);
        return arr.splice(idx, idx).pop();
    }
    Data.get = function () {
        var dat = ranDex(Data.anagrams);

        return {
            correct: dat[0],
            anagram: takeAnagram(dat),
        };
    };

    Data.anagrams = [
        [
            'Happy Holidays',
            'Aloha Dippy Shy',
            'Ladyship Ya Hop',
            'Daily Happy Ohs',
            'Shady Hay I Plop',
            'Dial Pay Hop Shy',
        ], [
            'Joy and Peace',
            'A Pecan Joyed',
            'Ape Jan Decoy',
            'Can Ya Do Jeep',
        ], [
            'Merry and Bright',
            'Band Tiger Myrrh',
            'Drab Erring Myth',
            'Breath Drying Mr',
            'Grab Nerdy Mirth',
            'Agent Bird Myrrh',
            'Mr Bath Nerdy Rig',
        ], [
            'Hope and Joy',
            'A Dopey John',
            'Pay John Doe',
            'Ah Pond Joey',
            'Jade Hypo No',
            'Hop Ad Enjoy',
        ], [
            'Happy \nNew Year',
            'Hyena Awry Pep',
            'Napper Way Hey',
            'A Yarn Peep Why',
            'Away He Pen Pry',
        ], [
            'Calm and \nBright',
            'Brag Latch Mind',
            'Barn Mad Glitch',
            'Bald Nag Inch Mr',
            'Clad Hang Bit Mr',
        ], [
            'Happy Everything',
            'Gather Envy Hippy',
            'Vegan He Pithy Pry',
            'Gravy He Ten Hippy',
        ], [
            'Friends Family \nHappiness',
            'Nerd Ifs Fail My Heap Spins',
            'Reds Fin Aim Fly Nap She Sip',
            'Finders Fail My Pass He Nip',
        ], [
            'Jingle Bells',
            'Bell Lens Jig',
            'Nib Leg Jells',
            'Bin Gels Jell',
            'Big Jell Lens',
        ], [
            'Holiday Cheer',
            'Yeah Chloride',
            'Each Idyl Hero',
            'Achy Deli Hoer',
            'El Heady Choir',
            'Ahoy Chile Red',
            'A Echo Idly Her',
        ], [
            'Tis the season',
            //'Hesitate Sons',
            //'Instate Shoes',
            'Ease Thin Toss',
            'Stashes Tie On',
            'Siesta To Hens',
        ], [
            'Enjoy Every Moment',
            'Yeomen Never Jot My',
            'Emote Over My Jenny',
            'Joey Memo Rent Envy',
            'Mere One Envy Jot My',
        ]
    ];

    return Data;
});
