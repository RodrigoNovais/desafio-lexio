import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import Avatar from './Avatar';
import AvatarCSS from './Avatar.module.css';

describe('Avatar', () => {
    it('should render on screen', () => {
        const { container } = render(<Avatar name='Clarice Lispector' />);

        const avatars = container.getElementsByClassName(AvatarCSS['avatar']);
        expect(avatars).toHaveLength(1);
    });

    it('should not render with empty or undefined name', () => {
        expect(() => render(<Avatar name='' />))
            .toThrow('Name param must not be empty');
    });

    it('should display the initials', () => {
        const { container } = render(<Avatar name='Jorge Amado' />);

        const [avatar] = container.getElementsByClassName(AvatarCSS['avatar']);
        expect(avatar.innerHTML).toBe('JA');
    });

    it('should use last surname on render', () => {
        const { container } = render(<Avatar name='Joaquim Maria Machado de Assis' />);

        const [avatar] = container.getElementsByClassName(AvatarCSS['avatar']);
        expect(avatar.innerHTML).toBe('JA');
    });

    it ('should work fine when there\'s no surname', () => {
        const { container } = render(<Avatar name='Alceu' />);

        const [avatar] = container.getElementsByClassName(AvatarCSS['avatar']);
        expect(avatar.innerHTML).toBe('A');
    })
});
