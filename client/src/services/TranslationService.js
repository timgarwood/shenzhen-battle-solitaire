export default class TranslationService {
    translations = {
        'ERR_GAME_NOT_FOUND': 'The game could not be found',
        'ERR_GAME_EXISTS': 'That game already exists'
    };

    translate = (errorCode) => {
        return this.translations[errorCode];
    }
}