import { Box, Flex, Input, Text } from "@chakra-ui/react"
import { useState, useRef } from "react"
import PlacesAutocomplete, {
  geocodeByPlaceId,
  GeocoderAddressComponent
} from "react-places-autocomplete"

export const SelectRecipient = () => {
  const [address, setAddress] = useState("")
  const [address2, setAddress2] = useState("")
  const [postcode, setPostcode] = useState("")
  const [locality, setLocality] = useState("")
  const [state, setState] = useState("")
  const [placeSelected, setPlaceSelected] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const address2ref = useRef()

  const handleChange = (address) => {
    setAddress(address)
  }

  const handleSelect = (selected: any, placeId: string) => {
    setAddress(selected)
    geocodeByPlaceId(placeId).then(fillInAddress).catch(console.error)
  }

  const handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status) // eslint-disable-line no-console
    setErrorMessage(status)
    clearSuggestions()
  }

  const fillInAddress = (place) => {
    setPlaceSelected(true)
    let address1Value
    let postcodeValue

    for (const component of place[0]
      .address_components as GeocoderAddressComponent[]) {
      // @ts-ignore remove once typings fixed
      const componentType = component.types[0]

      switch (componentType) {
        case "street_number": {
          address1Value = `${component.long_name}`
          break
        }

        case "route": {
          address1Value = address1Value + " " + component.short_name
          break
        }

        case "postal_code": {
          postcodeValue = `${component.long_name}${
            postcodeValue ? postcodeValue : ""
          }`
          break
        }

        case "postal_code_suffix": {
          postcodeValue = `${postcodeValue}-${component.long_name}`
          break
        }

        case "locality":
          setLocality(component.long_name)
          break

        case "administrative_area_level_1": {
          setState(component.short_name)
          break
        }
      }
    }

    setAddress(address1Value)
    setPostcode(postcodeValue)

    if (address2ref.current) {
      // @ts-ignore
      address2ref.current.focus()
    }
  }

  return (
    <Box>
      <PlacesAutocomplete
        onChange={handleChange}
        value={address}
        onSelect={handleSelect}
        onError={handleError}
        shouldFetchSuggestions={address.length > 2}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => {
          return (
            <Box maxW="md">
              <Box>
                <Text fontSize="xs" pl="2" mb="1">
                  {placeSelected ? "Address Line 1" : "Address"}
                </Text>
                <Input
                  {...getInputProps({
                    placeholder: "Search Places..."
                  })}
                  autoComplete="off"
                />
              </Box>
              {suggestions.length > 0 && (
                <Box>
                  {suggestions.map((suggestion) => {
                    return (
                      <Text
                        key={suggestion.formattedSuggestion.mainText}
                        my="2"
                        _hover={{ cursor: "pointer" }}
                        {...getSuggestionItemProps(suggestion)}
                      >
                        <strong>
                          {suggestion.formattedSuggestion.mainText}
                        </strong>{" "}
                        <small>
                          {suggestion.formattedSuggestion.secondaryText}
                        </small>
                      </Text>
                    )
                  })}
                </Box>
              )}
              {placeSelected && (
                <>
                  <Text fontSize="xs" mt="2" mb="1" pl="2">
                    Apt/Unit #
                  </Text>
                  <Input
                    value={address2}
                    ref={address2ref}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                  <Text fontSize="xs" mt="2" mb="1" pl="2">
                    City
                  </Text>
                  <Input
                    value={locality}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                  <Flex direction="row">
                    <Box flex="1" pr="3">
                      <Text fontSize="xs" mt="2" mb="1" pl="2">
                        State
                      </Text>
                      <Input
                        value={state}
                        onChange={(e) => setLocality(e.target.value)}
                      />
                    </Box>
                    <Box flex="1">
                      <Text fontSize="xs" mt="2" mb="1" pl="2">
                        Zipcode
                      </Text>
                      <Input
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                      />
                    </Box>
                  </Flex>
                </>
              )}
            </Box>
          )
        }}
      </PlacesAutocomplete>
      {errorMessage.length > 0 && <Text>{errorMessage}</Text>}
    </Box>
  )
}
