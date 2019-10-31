/** Используется для замены неопределенных хэш-значений */
const HASH_UNDEFINED = '__lodash_hash_undefined__';
//while(True):
//pyautogui.press('space')
class Hash {
	/**
	 * Создает хэш обект.
	 * 
	 * @private
	 * @constructor
	 * @param {Array} [entries] Пары "ключ-значение" для кэширования
	 */
	constructor(entries) {
		let index = -1;
		const length = entries === null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			const entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}

	/**
	 * Удаляет все записи пар "ключ-значение" из хэша.
	 * 
	 * @memberOf Hash
	 */
	clear() {
		this.__data__ = Object.create(null);
		this.size = 0;
	}

	/**
	 * Удаляет ключ и его значение из хэша.
	 * 
	 * @memberOf Hash
	 * @param {string} key Ключ значения для удаления
	 * @returns {boolean} Возвращает 'true', если запись 
	 * была удалена, в противном случае - 'false'
	 */
	delete(key) {
		const result = this.has(key) && delete this.__data__[key];
		this.size -= result ? 1 : 0;
		return result;
	}

	/**
	 * Возвращает хэш-значение для ключа.
	 * 
	 * @memberOf Hash
	 * @param {string} key Ключ значения для выдачи
	 * @returns {*} Возвращает значение записи
	 */
	get(key) {
		const data = this.__data__;
		const result = data[key];
		return result === HASH_UNDEFINED ? undefined : result;
	}

	/**
	 * Проверяет, существует ли хэш-значение для ключа.
	 * 
	 * @memberOf Hash
	 * @param {string} key Ключ для проверки
	 * @returns {boolean} Возвращает 'true' если запись 
	 * для ключа существует, в противном случае - 'false'
	 */
	has(key) {
		const data = this.__data__;
		return data[key] !== undefined;
	}

	/**
	 * Устанавливает хеш ключ в значение
	 * 
	 * @memberOf Hash
	 * @param {string} key Ключ для установки значения
	 * @param {*} value Значение для установки
	 * @returns {Object} Возвращает экземпляр класса 
	 */
	set(key, value) {
		const data = this.__data__;
		this.size += this.has(key) ? 0 : 1;
		data[key] = value === undefined ? HASH_UNDEFINED : value;
		return this;
	}
}

export default Hash;