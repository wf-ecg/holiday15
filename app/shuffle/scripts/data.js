/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-10
 */

define(function () {
    'use strict';

    var W = (W && W.window || window), C = (W.C || W.console || {});

    var Data = W.Data || {};

    Data.get = function () {
        return {
            correct: 'GARETH',
            anagram: 'THRAGE'
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
            'Happy New Year',
            'Hyena Awry Pep',
            'Napper Way Hey',
            'A Yarn Peep Why',
            'Away He Pen Pry',
        ], [
            'Calm and Bright',
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
            'Friends Family Happiness',
            'Nerd Ifs La If My Heap Spins',
            'Reds Fin Am Fly I Nap She Sip',
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
            'Hesitate Sons',
            'Instate Shoes',
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

    Data.anagrams.util = {
        checklengths: function () {
        }
    };

    return Data;
});
