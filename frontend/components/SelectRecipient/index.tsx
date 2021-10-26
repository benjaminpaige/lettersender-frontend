import { Box, Flex, Input, Text } from "@chakra-ui/react"
import { useState, useRef } from "react"
import PlacesAutocomplete, { geocodeByPlaceId } from "react-places-autocomplete"

const initialRecipient = {
  address: "",
  address2: "",
  postcode: "",
  locality: "",
  state: ""
}

const useSelectRecipient = () => {
  const [recipientName, setRecipientName] = useState(null)
  const [recipient, setRecipient] = useState(initialRecipient)
  const [placeSelected, setPlaceSelected] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const address2ref = useRef<HTMLInputElement>()

  const handleChange = (address: string) => {
    setRecipient({ ...recipient, address })
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
          setRecipient((prev) => ({ ...prev, locality: component.long_name }))
          break

        case "administrative_area_level_1": {
          setRecipient((prev) => ({ ...prev, state: component.short_name }))
          break
        }

        default:
          break
      }
    }

    setRecipient((prev) => ({ ...prev, address: address1Value }))
    setRecipient((prev) => ({ ...prev, postcode: postcodeValue }))

    if (address2ref.current) {
      if (!address2ref.current) return
      address2ref.current?.focus()
    }
  }

  return {
    handleError,
    handleChange,
    handleSelect,
    recipient,
    placeSelected,
    errorMessage,
    address2ref,
    setRecipient,
    recipientName,
    setRecipientName
  }
}

const Component: React.FC<ReturnType<typeof useSelectRecipient>> = ({
  handleChange,
  recipient,
  handleSelect,
  handleError,
  placeSelected,
  address2ref,
  setRecipient,
  errorMessage,
  recipientName,
  setRecipientName
}) => (
  <Box>
    <PlacesAutocomplete
      onChange={handleChange}
      value={recipient.address}
      onSelect={handleSelect}
      onError={handleError}
      shouldFetchSuggestions={recipient.address.length > 2}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => {
        return (
          <Box maxW="md">
            <Box>
              <Text fontSize="xs" mb="1" pl="2">
                Recipient Name
              </Text>
              <Input
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
              <Text fontSize="xs" mt="2" pl="2" mb="1">
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
                      <strong>{suggestion.formattedSuggestion.mainText}</strong>{" "}
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
                  value={recipient.address2}
                  ref={address2ref}
                  onChange={(e) =>
                    setRecipient({ ...recipient, address2: e.target.value })
                  }
                />
                <Text fontSize="xs" mt="2" mb="1" pl="2">
                  City
                </Text>
                <Input
                  value={recipient.locality}
                  onChange={(e) =>
                    setRecipient({ ...recipient, locality: e.target.value })
                  }
                />
                <Flex direction="row">
                  <Box flex="1" pr="3">
                    <Text fontSize="xs" mt="2" mb="1" pl="2">
                      State
                    </Text>
                    <Input
                      value={recipient.state}
                      onChange={(e) =>
                        setRecipient({ ...recipient, state: e.target.value })
                      }
                    />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="xs" mt="2" mb="1" pl="2">
                      Zipcode
                    </Text>
                    <Input
                      value={recipient.postcode}
                      onChange={(e) =>
                        setRecipient({
                          ...recipient,
                          postcode: e.target.value
                        })
                      }
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

export { Component, useSelectRecipient }
