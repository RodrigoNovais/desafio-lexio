import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import Document, { Agreement } from './Document';
import DocumentCSS from './Document.module.css';

const FakeDocument: Agreement = {
    id:        2,
    title:     'Procuração',
    sub_title: 'Procuração Ad Judicia',
    status:    'em revisão',
    parties:   ['Walther Negrão', 'Marcelo Negrão'],
    object:    'Ouviram do Ipiranga, às margens plácidas\nDe um povo heroico, o brado retumbante\nE o Sol da liberdade, em raios fúlgidos\nBrilhou no céu da pátria nesse instante',
}

describe('Document', () => {
    it('should render on screen', () => {
        const { container } = render(<Document document={FakeDocument} />);

        const item = container.getElementsByClassName(DocumentCSS['item']);
        expect(item).toHaveLength(1);
    });

    it('should not render with empty or undefined status', () => {
        expect(() => render(<Document />))
            .toThrow('Document param must not be empty');
    });
});
