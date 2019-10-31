import { eq } from "../eq";

/**
 * Возвращает индекс, по которому ключ 
 * находится в массиве пар "ключ-значение".
 * 
 * @private
 * @param {Array} array Массив для проверки
 * @param {*} key Ключ для поиска
 * @returns {number} Возвращает индекс совпадающего значения,
 * в противном случае возвращает -1.
 */
function assocIndexOf(array, key) {
	let { length } = array;
	while (length--)
		if (eq(array[length][0], key))
			return length
	return -1;
}

// console.log(assocIndexOf([1,2,3], 2));

export default assocIndexOf;