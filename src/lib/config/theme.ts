export type ThemeName = 'light' | 'dark';

export const shapeConfig = {
	pill: '999px',
	panel: 'clamp(20px, 3vw, 32px)',
	inset: '16px'
} as const;

export const scrollbarConfig = {
	width: '6px',
	minimumThumb: '48px'
} as const;

type ThemePalette = {
	canvas: string;
	ink: string;
};

export const themeConfig: Record<ThemeName, ThemePalette> = {
	light: {
		canvas: '#ffffff',
		ink: '#000000'
	},
	dark: {
		canvas: '#000000',
		ink: '#ffffff'
	}
};

export const themeVariables = (theme: ThemeName) => {
	const palette = themeConfig[theme];

	return [
		`--radius-pill: ${shapeConfig.pill}`,
		`--radius-panel: ${shapeConfig.panel}`,
		`--radius-inset: ${shapeConfig.inset}`,
		`--color-canvas: ${palette.canvas}`,
		`--color-ink: ${palette.ink}`,
		`--color-muted: color-mix(in srgb, ${palette.ink} 58%, transparent)`,
		`--color-subtle: color-mix(in srgb, ${palette.ink} 10%, ${palette.canvas})`,
		`--color-hairline: color-mix(in srgb, ${palette.ink} 18%, transparent)`,
		`--color-inverse: ${palette.ink}`,
		`--color-on-inverse: ${palette.canvas}`
	].join('; ');
};
