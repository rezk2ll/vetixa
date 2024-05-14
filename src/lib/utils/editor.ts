import type { RawEditorOptions } from 'tinymce';

export const defaultEditorOptions: RawEditorOptions = {
	branding: false,
	promotion: false,
	menubar: false,
	min_height: 270,
	height: 270,
	max_height: 700,
	autoresize_bottom_margin: 30,
	content_style: 'body { font-size: 14px }',
	plugins: ['autoresize', 'autolink', 'lists', 'link', 'searchreplace', 'table', 'directionality'],
	toolbar:
		'styles | alignleft aligncenter alignright | bold italic forecolor backcolor | bullist numlist | link image_picker table codesample direction | code fullscreen'
};
