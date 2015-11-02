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

    Data.test = function () {
        return {
            correct: 'Happy\nHolidays\n ',
            anagram: 'Aloha\nDippy\nShy ',
        };
    };

    Data.anagrams = [
        [
            'Happy \nHolidays',
            'Aloha\nDippy Shy',
            'Ladyship\nYa Hop',
            'Daily\nHappy Ohs',
            'Shady Hay\nI Plop',
            'Dial Pay\nHop Shy',
        ], [
            'Joy and\nPeace',
            'A Pecan\nJoyed',
            'Ape Jan\nDecoy',
            'Can Ya\nDo Jeep',
        ], [
            'Merry and\nBright',
            'Band Tiger\nMyrrh',
            'Drab\nErring Myth',
            'Breath\nDrying Mr',
            'Grab Nerdy\nMirth',
            'Agent Bird\nMyrrh',
            'Mr Bath\nNerdy Rig',
        ], [
            'Hope\nand Joy',
            'A Dopey\nJohn',
            'Pay John\nDoe',
            'Ah Pond\nJoey',
            'Jade\nHypo No',
            'Hop Ad\nEnjoy',
        ], [
            'Happy\nNew Year',
            'Hyena\nAwry Pep',
            'Napper\nWay Hey',
            'A Yarn\nPeep Why',
            'Away He\nPen Pry',
        ], [
            'Calm and\nBright',
            'Brag Latch\nMind',
            'Barn Mad\nGlitch',
            'Bald Nag\nInch Mr',
            'Clad Hang\nBit Mr',
        ], [
            'Happy\nEverything',
            'Gather\nEnvy Hippy',
            'Vegan He\nPithy Pry',
            'Gravy He\nTen Hippy',
        ], [
            'Friends \nFamily \nHappiness',
            'Nerd Ifs\nFail My\nHeap Spins',
            'Reds Fin\nAim Fly\nNap She Sip',
            'Finders\nFail My\nPass He Nip',
        ], [
            'Jingle\nBells',
            'Bell\nLens Jig',
            'Nib Leg\nJells',
            'Bin Gels\nJell',
            'Big Jell\nLens',
        ], [
            'Holiday\nCheer',
            'Yeah\nChloride',
            'Each Idyl\nHero',
            'Achy Deli\nHoer',
            'El Heady\nChoir',
            'Ahoy\nChile Red',
            'A Echo\nIdly Her',
        ], [
            'Tis the\nseason',
            //'Hesitate Sons',
            //'Instate Shoes',
            'Ease Thin\nToss',
            'Stashes\nTie On',
            'Siesta\nTo Hens',
        ], [
            'Enjoy \nEvery\n Moment',
            'Yeomen\nNever \nJot My',
            'Emote\nOver My\nJenny',
            'Joey Memo\nRent Envy\n',
            'Mere\nOne Envy\nJot My',
        ]
    ];

    return Data;
});
