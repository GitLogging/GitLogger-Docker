
interface PropertyMapping {
    /**
     * Converts keyvalue pairs into a layout that a <InputOptionItem> requires
     */
    label?: string
    value?: string
}

/**
 * @summary Convert an array of items into <option> elements. Optionally declare property names
 * @description Allows custom property mapping for label and value properties
 * @example
 * BuildInputOptionsFrom(items) // uses default 'label' and 'value' properties
 * BuildInputOptionsFrom(items, { label: 'label', value: 'url' }) // custom mapping
 */
export function BuildInputOptionsFrom(
    items: any[],
    mapping?: PropertyMapping
): React.ReactNode {
    const defaultMapping: PropertyMapping = {
        label: 'label',
        value: 'value',
    }

    const finalMapping = { ...defaultMapping, ...mapping }

    return (
        <>
            {items.map((item, index) => (
                <option
                    key={index}
                    label={item[finalMapping.label!]}
                    value={item[finalMapping.value!]}
                />
            ))}
        </>
    )
}