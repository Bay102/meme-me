import { View, type ViewProps } from 'react-native'
import styled from '@emotion/native'
import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

const StyledView = styled.View<ThemedViewProps>(({ lightColor, darkColor }) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  )
  return {
    backgroundColor,
  }
})

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  return (
    <StyledView
      style={style}
      lightColor={lightColor}
      darkColor={darkColor}
      {...otherProps}
    />
  )
}
