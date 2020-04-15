export const configs =
{
    "defaultTimerSeconds": "3",
    "timerOptions": [3, 5, 7],
    "shuffleCount": 1,
    "Game completion": "Hope you enjoyed the game :) ",
    "fivers": [{ "name": "Fast 5", "status": false }, { "name": "1L", status: false },
    { "name": "2L", status: false }, { "name": "3L", status: false },],
    "soundFailMsg": "Failed to express sound :( ",
    "soundNonSupportMsg": "We don't support sound for this device",
    "speechSettings": {
        "defaultLanguage": "en-GB",
        "config": {
            'volume': 1,
            'lang': "en-GB",
            'rate': 1,
            'pitch': 1,
            'voice': 'Google UK English Male',
            'splitSentences': true,
            'listeners': {
                'onvoiceschanged': (voices) => {
                    console.log("Event voiceschanged", voices)
                }
            }
        }
    },
    "tab1ResetKey":"manual",
    "tab2ResteKey":"automatic",
    "NoNumbersCalled":"No numbers are called yet!!",
    "HistoryHeading":"COMPLETED NUMBERS"
}