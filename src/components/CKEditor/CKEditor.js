import React from 'react';
import {CKEditor} from 'ckeditor4-react'

export const CKEditorComponent =
    ({ value, onChange, useFormulas, onFocus, readOnly = false, onBlur, toolbarIcons, 
        toolbarContainerId = 'toolbar-container', height, width, style }) => {
    const config = {
        extraPlugins: [useFormulas ? 'mathjax' : '', 'embed',  'autoembed', 'font', 'justify', 'openlink'],
        embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
        mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
        openlink_enableReadOnly: true,
        allowedContent: true,
        height,
        width,
    }

    return (
        <CKEditor
            config={config}
            data={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            readOnly={readOnly}
            onBeforeLoad={(CKEDITOR) => {
                CKEDITOR.plugins.addExternal( 'openlink', '/openlink/plugin.js');
                // fix play video from Media Embed
                CKEDITOR.addCss('.cke_widget_wrapper iframe{z-index:9999;}');
            }
            }
            style={style}
        />
    )
}

export default CKEditorComponent