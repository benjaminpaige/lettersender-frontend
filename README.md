### Feature Components

A feature directory will contain all elements encompassing the ui functionality of a page.

- Root
- Components
- Type defs
- Hooks
- Styles
- Utils

#### Root

at the root of a feature directory, should exist a `index.ts` file which exports all modules within its respective directory.

```js
export * from "./types"
export * from "./ReservationList"
export * from "./styles"
```

#### Components

Implementation of feature components should prioritize functionality over reusability. As long logic redundancy is scope within sibling components, abstraction at a higher level isn't necessary, and generally should be avoided.

- When designing Components, shoot for slim and minimal. Err on the side of `flat logic`

```js
// ❌
const Feature = () => {
  const { loading, error, data } = useContext()
  return (
    <Flex>
      <Text>FEATURE</Text>
      {!loading && error && <Text>{error.message}</Text>}
      {loading ? (
        <Box>
          <Text>Loading Table</Text>
          <Text>Please Wait</Text>
        </Box>
      ) : (
        <SomeTable data={data} />
      )}
    </Flex>
  )
}

// ✅
const FeatureControl = () => {
  const { loading, error, data } = useContext()

  if (loading) {
    return (
      <Box>
        <Text>Loading Table</Text>
        <Text>Please Wait</Text>
      </Box>
    )
  }

  if (!loading && error) {
    return <Text>{error.message}</Text>
  }

  return <SomeTable data />
}

const Feature = () => {
  const { loading, error, data } = useContext()
  return (
    <Flex>
      <Text>FEATURE</Text>
      <FeatureControl />
    </Flex>
  )
}
```

`Flat logic` should also be the driving force for conditional flow within methods

```js
❌
export const useMobileMenuState = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  useEffect(() => {
    if (!isMobile == false) {
      onClose()
    }
  }, [isMobile, onClose])

  return { isOpen, onClose, onOpen }
}

✅
export const useMobileMenuState = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  useEffect(() => {
    if (isMobile) return

    onClose()
  }, [isMobile])

  return { isOpen, onClose, onOpen }
}
```

- Avoid nested object destructuring. Destructuring at root level is acceptable, but any further, either removes valuable context for readability or requires field renaming.

```js
❌
const [checkout, { error }] = useMutation(CREATE_ORDER_MUTATION)

✅
const [checkout, checkoutResponse] = useMutation(CREATE_ORDER_MUTATION)
checkoutResponse.error
```

Avoid reaching out to `useEffect` to handle lifecycle events. UseEffects are acceptable if:

- no dependencies are required (triggered once after initial mount).
- dependencies are entirely props based.

Consider declarative approaches first before deciding on `useEffect`. There'll always be some edge cases, where a `useEffect` would offer the best solution. However, its important to consider that a `useEffect`, which has dependencies on any state value, will likely result in hidden, unintended side effects in future iterations of the component/hook.

#### Type Definitions

A `types.ts` file should exist at:

- Feature level
- Component level (Exception are function components with no props | state)
- Hook level

At the root of every types file should be a namespace declaration prefaced by the `µ` character followed by the feature/component/hook name.

In the instance of a **Feature**, here are the list of definitions that can exist within the respective namespace:

- Utils class
- Constants class
- Enums namespace

```js
export namespace µAccount {
  export class Constants {
    static defaultRole = 'admin'
    static API_KEY = process.env.API_KEY
  }

  export class Utils {
    static mapThisToThat = (treasure) => {
      return treasure.map((goto) => goto.boogerHole_westVirginia)
    }
  }

  export namespace Enums {
    export enum Role {
      ADMIN,
      USER,
      SPECIALIST
    }
  }
}
```

for a **Components**:

- Props interface
- Methods interface
- Styles interface (if typing is needed)

```js
export namespace µFleetMap {
  export interface Props {
    map: google.maps.Map;
    isOpen: boolean;
    onToggle: () => void;
  }

  export interface Methods {
    handleClick: () => void;
    handleSelect: (itemIndex: number) => void;
  }

  export interface Styles {
    // i dont give a shit about styles
  }
}
```

and for **Hooks**:

- Params interface
- State interface
- Methods interface

```js
export namespace µUseGoogleMap {
  export interface Params {
    map: google.maps.Map;
  }

  export interface Methods {
    handleMapLoad: (map: google.map.maps) => void;
    handleMarkerClick: (markerId: string) => void;
  }

  export interface State {
    isLoaded: boolean;
    markers: google.maps.Marker[]
  }
}
```

Why namespaces?

- Creates a clear delineation between type definitions, and js modules

```js
import {
  Button,
  ButtonProps,
  ButtonMethods,
  SubmitButton,
  IconButton,
  AnimateButton,
  BlueButton
} from "./ui/r/meant/2be"
```

vs

```js
import {
  Button,
  µButton,
  SubmitButton,
  IconButton,
  AnimateButton,
  BlueButton
} from "./ui/r/meant/2be"

µButton.Props
µButton.Methods
```

- Ensures naming to be consistent across all type imports. In addition, simplifies by consolidating similar type imports into a logical structure while avoiding singular imports from extracting valuable, readable context.

```js
import { ButtonProps, ButtonMethods } from "./ui/r/meant/2be/Button"
import { CardProps, CardMethods } from "./ui/rmeant/2be/Card"
```

```js
import { µButton, µCard } from "./ui/rmeant/2be"

µButton.Props
µButton.Methods
µCard.Props
µCard.Methods
```
