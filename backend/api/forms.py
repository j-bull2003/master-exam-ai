# quizzes/forms.py
from django import forms

class BulkUploadForm(forms.Form):
    file = forms.FileField(
        help_text="CSV or XLSX. See template format below."
    )
