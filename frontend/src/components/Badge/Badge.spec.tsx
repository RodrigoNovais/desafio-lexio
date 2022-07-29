import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import Badge from './Badge';
import BadgeCSS from './Badge.module.css';

describe('Badge', () => {
    it('should render on screen', () => {
        const { container } = render(<Badge status='assinado' />);

        const badges = container.getElementsByClassName(BadgeCSS['badge']);
        expect(badges).toHaveLength(1);
    });

    it('should not render with empty or undefined status', () => {
        expect(() => render(<Badge status='' />))
            .toThrow('Status param must not be empty');
    });

    it('should not render with invalid status', () => {
        expect(() => render(<Badge status='done' />))
            .toThrow('Status param provided is not allowed');
    });

    it('should render correct style for different status', () => {
        const { container } = render(<Badge status='assinado' />);

        const [badge] = container.getElementsByClassName(BadgeCSS['badge']);
        expect(badge.className).toContain(BadgeCSS['signed']);
    });
});
