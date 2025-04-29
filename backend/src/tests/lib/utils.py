def without[K, V](dictionary: dict[K, V], *keys: K) -> dict[K, V]:
    dictionary_copy = dictionary.copy()
    for key in keys:
        dictionary_copy.pop(key, None)
    return dictionary_copy
