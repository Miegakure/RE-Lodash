import Hash from './Hash';


/**
 * Возвращает данные для map.
 * 
 * @private
 * @param {Object} map Запрос
 * @param {string} key Ключ
 * @returns {*} Возвращает данные для map
 */
function getMapData({__data__}, key) {
	const data = __data__;
	return isKeyable(key)
		? data[typeof key === 'string' ? 'string' : 'hash']
		: data.map;
}

/**
 * Проверяет, подходит ли заданное 
 * значение для использования в 
 * качестве уникального ключа.
 * 
 * @private
 * @param {*} value Значение для проверки
 * @returns {boolean} Возвращает 'true', 
 * если значение подходит, иначе 'false'.
 */
function isKeyable(value) {
	const type = typeof value;
	return (type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean')
		? (value !== '__proto__')
		: (value === null);
}

class MapCache {
	/**
	 * Создает MapCache объект для хранения
	 * пар "ключ-значение"
	 * 
	 * @private
	 * @constructor
	 * @param {Array} [entries] Пары "ключ-значение"
	 */
	constructor(entries) {
		let index = -1;
		const length = entries == null ? 0 : entries.length;

		this.clear();
		while (++index < length) {
			const entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}

	/**
	 * Удаляет все пары "ключ-значение" конкретной записи.
	 * 
	 * @memberOf MapCache
	 */
	clear() {
		this.size = 0;
		this.__data__ = {
			'hash'  : new Hash,
			'map'   : new Map,
			'string': new Hash
		}
	}

	/**
	 * Удаляет ключ и его значение из ВСЕГО объекта.
	 * 
	 * @memberOf MapCache
	 * @param {string} key Ключ значения, который должен
	 * быть удален
	 * @returns {boolean} Возвращает 'true' если все записи
	 * были удалены, если нет, то 'false'
	 */
	delete(key) {
		const result = getMapData(this, key)['delete'](key);
		this.size -= result ? 1 : 0;
		return result;
	}

	/**
	 * Возвращает значение для указанного ключа.
	 * 
	 * @memberOf MapCache
	 * @param {string} key Ключ, значение которого вернет
	 * этот метод
	 * @returns {*} Возвращает значение записи.
	 */
	get = (key) => getMapData(this, key).get(key);

	/**
	 * Проверяет наличие значение, для указанного
	 * ключа.
	 * 
	 * @memberOf MapCache
	 * @param {string} key Ключа, имеющий значение, которое
	 * необходимо проверить на наличие.
	 * @returns {*} 'true' если значение есть, иначе 'false'
	 */
	has = (key) => getMapData(this, key).has(key);

	/**
	 * Устанавливает значение для указанного ключа.
	 * 
	 * @memberOf MapCache
	 * @param {string} key Ключ, которому нужно установить
	 * значение
	 * @param {*} value Значение, которое нужно установить
	 * для ключа
	 * @returns {Object} Возвращает экземпляр класса MapCache
	 */
	set(key, value) {
		const data = getMapData(this, key);
		const size = data.size;
		data.set(key, value);
		this.size += data.size === size ? 0 : 1;
		return this;
	}
}

export default MapCache;