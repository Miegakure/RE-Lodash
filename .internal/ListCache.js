import assocIndexOf from './assocIndexOf.js';

class ListCache {
	/**
	 * Создает список объектов кэша.
	 * 
	 * @private
	 * @constructor
	 * @param {Array} [entries] Пары "ключ-значения" для кэша
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
	 * Удаляет все записи ключ-значение из кэша списка.
	 * 
	 * @memberOf ListCache
	 */
	clear() {
		this.__data__ = [];
		this.size = 0;
	}

	/**
	 * Удаляет ключ и его значение из кэша списка.
	 * 
	 * @memberOf ListCache
	 * @param {string} key Ключ значения, который необходимо удалить
	 * @returns {boolean} Возвращает 'true', если запись 
	 * была удалена, в противном случае - 'false'
	 */
	delete(key) {
		const data = this.__data__;
		const index = assocIndexOf(data, key);

		if (index < 0)
			return false;
		
		const lastIndex = data.length - 1;
		if (index === lastIndex)
			data.pop();
		else
			data.splice(index, 1);
		
		--this.size;
		return true;
	}

	/**
	 * Возвращает значение кэша списка для ключа.
	 * 
	 * @memberOf ListCache
	 * @param {string} key Ключ значения
	 * @returns {*} Возвращает значение записи.
	 */
	get(key) {
		const data = this.__data__;
		const index = assocIndexOf(data, key);
		return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Проверяет наличие значение кэша списка для ключа
	 * 
	 * @memberOf ListCache
	 * @param {string} key Ключ для проверки
	 * @returns {boolean} Возвращает 'true' если запись 
	 * для ключа существует, в противном случае - 'false'
	 */
	has(key) {
		return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Устанавливает значение для ключа.
	 * 
	 * @memberOf ListCache
	 * @param {string} key Ключ для установки значения
	 * @returns {Object} Возвращает экземпляр кэша списка
	 */
	set(key, value) {
		const data = this.__data__;
		const index = assocIndexOf(data, key);

		if (index < 0) {
			++this.size;
			data.push([key, value]);

		} else {
			data [index][1] = value;
		}

		return this
	}
}


export default ListCache;