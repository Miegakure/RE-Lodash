/**
 * Выполняет сравнение двух значений для 
 * определения их эквивалентности.
 * 
 * @param {*} value Значение для сравнения
 * @param {*} other Другое значение для сравнения
 * @returns {boolean} Возвращает 'true' если значения 
 * эквивалентны, в противном случае - 'false'
 * @example
 * >> eq(7, 7)
 * >> true
 * 
 * >> eq(7, Object(7))
 * >> false
 */
function eq(value, other) {
	/**
	 * Сначала тут был этот очень странный код,
	 * я хз зачем так сделали :/
	 * return value === other || (value !== value && other !== other);
	 * @roflanEbalo
	 */
	return value === other;
}

export default eq;