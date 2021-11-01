import { Box, Flex, Input, Text } from "@chakra-ui/react"
import { useState, useRef } from "react"
import PlacesAutocomplete, { geocodeByPlaceId } from "react-places-autocomplete"

export interface MailingAddress {
  address: string
  address2: string
  postcode: string
  locality: string
  state: string
}

const initialMainingAddresss = {
  address: "",
  address2: "",
  postcode: "",
  locality: "",
  state: ""
}

const useSelectMailingAddress = () => {
  const [mailingAddress, setMailingAddress] = useState<MailingAddress>(
    initialMainingAddresss
  )
  const [placeSelected, setPlaceSelected] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const address2ref = useRef<HTMLInputElement>()

  const handleChange = (address: string) => {
    setMailingAddress({ ...mailingAddress, address })
  }

  const handleSelect = (selected: any, placeId: string) => {
    geocodeByPlaceId(placeId)
      .then(([res]) => fillInAddress(res))
      .catch()
  }

  const handleError = (status: string, clearSuggestions: () => void) => {
    console.error("Error from Google Maps API", status) // eslint-disable-line no-console
    setErrorMessage(status)
    clearSuggestions()
  }

  const fillInAddress = (place: google.maps.GeocoderResult) => {
    setPlaceSelected(true)
    let address1Value
    let postcodeValue

    for (const component of place.address_components) {
      const [componentType] = component.types

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
          setMailingAddress((prev) => ({
            ...prev,
            locality: component.long_name
          }))
          break

        case "administrative_area_level_1": {
          setMailingAddress((prev) => ({
            ...prev,
            state: component.short_name
          }))
          break
        }

        default:
          break
      }
    }

    setMailingAddress((prev) => ({ ...prev, address: address1Value }))
    setMailingAddress((prev) => ({ ...prev, postcode: postcodeValue }))

    if (address2ref.current) {
      if (!address2ref.current) return
      address2ref.current?.focus()
    }
  }

  return {
    handleError,
    handleChange,
    handleSelect,
    mailingAddress,
    placeSelected,
    errorMessage,
    address2ref,
    setMailingAddress
  }
}

const Component: React.FC<ReturnType<typeof useSelectMailingAddress>> = ({
  handleChange,
  mailingAddress,
  handleSelect,
  handleError,
  placeSelected,
  address2ref,
  setMailingAddress,
  errorMessage
}) => (
  <Box>
    <PlacesAutocomplete
      onChange={handleChange}
      value={mailingAddress.address}
      onSelect={handleSelect}
      onError={handleError}
      shouldFetchSuggestions={mailingAddress.address.length > 2}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => {
        return (
          <Box maxW="md">
            <Box>
              <Text fontSize="xs" mt="2" pl="2" mb="1">
                {placeSelected ? "Address Line 1" : "Address"}
              </Text>
              <Input
                {...getInputProps({
                  placeholder: "Search Places..."
                })}
                autoComplete="one-time-code"
                aria-autocomplete="none"
              />
            </Box>
            {suggestions.length > 0 && (
              <Box>
                {suggestions.map((suggestion) => {
                  return (
                    // @ts-ignore
                    <Flex
                      key={suggestion.formattedSuggestion.mainText}
                      my="2"
                      pl="4"
                      _hover={{ cursor: "pointer" }}
                      {...getSuggestionItemProps(suggestion)}
                      fontSize="md"
                    >
                      <Text fontWeight="bold" mr="1">
                        {suggestion.formattedSuggestion.mainText}
                      </Text>
                      <Text>
                        {suggestion.formattedSuggestion.secondaryText}
                      </Text>
                    </Flex>
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
                  value={mailingAddress.address2}
                  ref={address2ref}
                  onChange={(e) =>
                    setMailingAddress({
                      ...mailingAddress,
                      address2: e.target.value
                    })
                  }
                  autoComplete="one-time-code"
                />
                <Text fontSize="xs" mt="2" mb="1" pl="2">
                  City
                </Text>
                <Input
                  value={mailingAddress.locality}
                  onChange={(e) =>
                    setMailingAddress({
                      ...mailingAddress,
                      locality: e.target.value
                    })
                  }
                  autoComplete="one-time-code"
                />
                <Flex direction="row">
                  <Box flex="1" pr="3">
                    <Text fontSize="xs" mt="2" mb="1" pl="2">
                      State
                    </Text>
                    <Input
                      value={mailingAddress.state}
                      onChange={(e) =>
                        setMailingAddress({
                          ...mailingAddress,
                          state: e.target.value
                        })
                      }
                      autoComplete="one-time-code"
                    />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="xs" mt="2" mb="1" pl="2">
                      Zipcode
                    </Text>
                    <Input
                      value={mailingAddress.postcode}
                      onChange={(e) =>
                        setMailingAddress({
                          ...mailingAddress,
                          postcode: e.target.value
                        })
                      }
                      autoComplete="one-time-code"
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

export { Component, useSelectMailingAddress }
