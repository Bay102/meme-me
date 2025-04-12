import { Text, type TextProps, TextStyle } from 'react-native'
import styled from '@emotion/native'
import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
}

type TextType = NonNullable<ThemedTextProps['type']>
type TextTypeStyles = {
  [K in TextType]: TextStyle
}

const textStyles: TextTypeStyles = {
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
}

const StyledText = styled.Text<ThemedTextProps>(
  ({ lightColor, darkColor, type = 'default' }) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
    const typeStyle = textStyles[type as TextType]

    return {
      color,
      ...typeStyle,
    }
  }
)

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  return (
    <StyledText
      style={style}
      lightColor={lightColor}
      darkColor={darkColor}
      type={type}
      {...rest}
    />
  )
}
